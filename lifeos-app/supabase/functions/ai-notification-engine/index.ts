import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const startTime = Date.now()

  const supabaseAdmin = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    { auth: { persistSession: false } }
  )

  const geminiKey = Deno.env.get('GEMINI_API_KEY')!

  try {
    console.log('🤖 LifeOS AI Notification Engine starting via Gemini...')

    const { data: users } = await supabaseAdmin
      .from('notification_preferences')
      .select('*')
      .eq('push_enabled', true)

    if (!users || users.length === 0) {
      return new Response(JSON.stringify({ message: 'No users to process' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    let totalGenerated = 0

    for (const prefs of users) {
      try {
        if (isInQuietHours(prefs)) continue

        const { count: todayCount } = await supabaseAdmin
          .from('notifications')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', prefs.user_id)
          .gte('created_at', new Date(Date.now() - 86400000).toISOString())

        if ((todayCount || 0) >= prefs.max_per_day) continue

        const userData = await gatherUserData(supabaseAdmin, prefs.user_id, prefs)
        const notifications = await generateWithAI(userData, geminiKey)

        if (notifications.length > 0) {
          await supabaseAdmin.from('notifications').insert(
            notifications.map((n: any) => ({ ...n, user_id: prefs.user_id }))
          )
          totalGenerated += notifications.length
        }
      } catch (e) {
        console.error(`Error for user ${prefs.user_id}:`, e)
      }
    }

    return new Response(
      JSON.stringify({ success: true, generated: totalGenerated, ms: Date.now() - startTime }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})

async function gatherUserData(supabase: any, userId: string, prefs: any) {
  const now = new Date()
  const in7d = new Date(now.getTime() + 7 * 86400000).toISOString()
  const in30d = new Date(now.getTime() + 30 * 86400000).toISOString()
  const data: any = { userId, now: now.toISOString() }

  if (prefs.finance_alerts) {
    const { data: bills } = await supabase.from('bills').select('name,amount,due_date')
      .eq('user_id', userId).eq('is_paid', false).lte('due_date', in7d)
    const { data: budgets } = await supabase.from('budgets').select('category,limit_amount,spent_amount')
      .eq('user_id', userId)
    data.bills = bills || []
    data.budgets = (budgets || []).filter((b: any) => b.spent_amount >= b.limit_amount * 0.85)
  }

  if (prefs.document_alerts) {
    const { data: docs } = await supabase.from('vault_items').select('name,category,expiry_date')
      .eq('user_id', userId).not('expiry_date', 'is', null).lte('expiry_date', in30d)
    data.expiringDocs = docs || []
  }

  if (prefs.health_alerts) {
    const { data: meds } = await supabase.from('medications').select('name,dosage,refill_date')
      .eq('user_id', userId).lte('refill_date', in7d)
    const { data: appts } = await supabase.from('appointments').select('title,doctor_name,date_time')
      .eq('user_id', userId).gte('date_time', now.toISOString()).lte('date_time', in7d)
    data.medsNeedingRefill = meds || []
    data.upcomingAppointments = appts || []
  }

  if (prefs.goal_alerts) {
    const { data: goals } = await supabase.from('goals').select('title,progress,target_date,status')
      .eq('user_id', userId).eq('status', 'active').lte('target_date', in30d)
    const { data: habits } = await supabase.from('habits').select('name,streak,last_logged')
      .eq('user_id', userId)
    data.urgentGoals = goals || []
    data.habitsAtRisk = (habits || []).filter((h: any) => {
      const lastLog = h.last_logged ? new Date(h.last_logged) : null
      return !lastLog || (now.getTime() - lastLog.getTime()) > 86400000
    })
  }

  if (prefs.family_alerts) {
    const { data: members } = await supabase.from('family_members').select('name,date_of_birth')
      .eq('user_id', userId)
    data.upcomingBirthdays = (members || []).filter((m: any) => {
      if (!m.date_of_birth) return false
      const bday = new Date(m.date_of_birth)
      const thisYear = new Date(now.getFullYear(), bday.getMonth(), bday.getDate())
      const diff = thisYear.getTime() - now.getTime()
      return diff > 0 && diff < 3 * 86400000
    })
  }

  return data
}

async function generateWithAI(userData: any, apiKey: string): Promise<any[]> {
  const system = `You are the LifeOS AI Notification Engine. Analyse user data and generate helpful push notifications. Rules: Max 4 notifications per run. Only notify about genuinely important things. Be specific and actionable. Prioritise: urgent(same day) > high(within 3 days) > normal > low. Titles under 50 chars, body under 100 chars. Respond ONLY with a JSON array. No other conversational text.
  Example: [{"type":"bill_due","category":"finance","title":"Bill Due Tomorrow 💸","body":"Netflix ₦5,600 due in 1 day","priority":"high","action_url":"/finance?tab=bills","ai_reasoning":"Due within 24h"}]
  If nothing needs notification, return: []`

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: `Analyse this user data and generate notifications:\n${JSON.stringify(userData, null, 2)}` }] }],
        systemInstruction: { parts: [{ text: system }] },
        generationConfig: { 
          responseMimeType: 'application/json', // Forces Gemini to output pure strict JSON
          temperature: 0.1 
        }
      }),
    })

    const geminiData = await res.json()
    const text = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '[]'
    const parsed = JSON.parse(text)
    return Array.isArray(parsed) ? parsed.filter((n: any) => n.type && n.title && n.body) : []
  } catch {
    return []
  }
}

function isInQuietHours(prefs: any): boolean {
  if (!prefs.quiet_hours_enabled) return false
  const now = new Date()
  const current = now.getHours() * 60 + now.getMinutes()
  const [sh, sm] = (prefs.quiet_start || '22:00').split(':').map(Number)
  const [eh, em] = (prefs.quiet_end || '07:00').split(':').map(Number)
  const start = sh * 60 + sm
  const end = eh * 60 + em
  return start > end ? (current >= start || current <= end) : (current >= start && current <= end)
}