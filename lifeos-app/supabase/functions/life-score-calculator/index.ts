import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const supabaseAdmin = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    { auth: { persistSession: false } }
  )

  try {
    const { data: users } = await supabaseAdmin.auth.admin.listUsers()
    if (!users) return new Response(JSON.stringify({ error: 'No users' }), { status: 500 })

    for (const user of users.users) {
      const score = await calculateScore(supabaseAdmin, user.id)
      await supabaseAdmin.from('profiles')
        .update({ life_score: score, updated_at: new Date().toISOString() })
        .eq('id', user.id)
    }

    return new Response(
      JSON.stringify({ success: true, usersUpdated: users.users.length }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})

async function calculateScore(supabase: any, userId: string): Promise<number> {
  let score = 0

  // FINANCIAL HEALTH (max 200)
  try {
    const { data: bills } = await supabase.from('bills').select('is_paid').eq('user_id', userId)
    const { data: budgets } = await supabase.from('budgets').select('limit_amount,spent_amount').eq('user_id', userId)
    const paidRatio = bills?.length ?
      bills.filter((b: any) => b.is_paid).length / bills.length : 0.5
    const budgetHealth = budgets?.length
      ? 1 - Math.min(1, budgets.reduce((acc: number, b: any) => acc + Math.max(0, (b.spent_amount / b.limit_amount) - 1), 0) / budgets.length)
      : 0.5
    score += Math.round((paidRatio * 100 + budgetHealth * 100) * 1.0) // max 200
  } catch {}

  // HEALTH (max 200)
  try {
    const today = new Date().toISOString().split('T')[0]
    const { data: medLogs } = await supabase.from('medication_logs').select('id')
      .eq('user_id', userId).gte('taken_at', `${today}T00:00:00`)
    const { data: moodLog } = await supabase.from('mood_logs').select('mood').eq('user_id', userId).eq('date', today)
    const medScore = medLogs?.length ? Math.min(100, medLogs.length * 20) : 30
    const moodScore = moodLog?.[0] ? moodLog[0].mood * 20 : 50
    score += Math.round((medScore + moodScore) * 1.0) // max 200
  } catch {}

  // GOALS (max 150)
  try {
    const { data: goals } = await supabase.from('goals').select('progress,status').eq('user_id', userId).eq('status', 'active')
    const avgProgress = goals?.length ?
      goals.reduce((a: number, g: any) => a + g.progress, 0) / goals.length : 50
    score += Math.round(avgProgress * 1.5) // max 150
  } catch {}

  // LIFE ADMIN — Documents (max 150)
  try {
    const { data: docs } = await supabase.from('vault_items').select('expiry_date').eq('user_id', userId)
    const expired = docs?.filter((d: any) => d.expiry_date && d.expiry_date < new Date().toISOString().split('T')[0]).length || 0
    const adminScore = Math.max(0, 150 - expired * 20)
    score += adminScore
  } catch {}

  // GROWTH — Learning (max 150)
  try {
    const { data: courses } = await supabase.from('courses').select('status').eq('user_id', userId)
    const { data: books } = await supabase.from('books').select('status').eq('user_id', userId)
    const activeLearning = (courses?.filter((c: any) => c.status === 'in_progress').length || 0) +
      (books?.filter((b: any) => b.status === 'reading').length || 0)
    score += Math.min(150, activeLearning * 30)
  } catch {}

  // COMMUNITY (max 150)
  try {
    const { data: posts } = await supabase.from('posts').select('id').eq('user_id', userId)
      .gte('created_at', new Date(Date.now() - 7 * 86400000).toISOString())
    const { data: donations } = await supabase.from('donations').select('id').eq('user_id', userId)
    const communityScore = Math.min(100, (posts?.length || 0) * 10) + Math.min(50, (donations?.length || 0) * 10)
    score += communityScore
  } catch {}

  return Math.min(1000, Math.max(0, score))
}