import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const SYSTEM_PROMPTS: Record<string, string> = {
  general: `You are LifeOS Assistant — a warm, expert personal life advisor.
You help users manage their finances, health, investments, goals, and overall life. Be concise, friendly, and actionable.
Use bullet points and bold for clarity.`,
  finance: `You are LifeOS Finance Advisor.
You are an expert in personal finance, budgeting, debt management, and wealth building. Give specific, actionable financial advice.
Always reference the user's actual situation.`,
  health: `You are LifeOS Health Advisor.
You provide wellness guidance, help track health goals, and give evidence-based health information.
Always remind users to consult professionals for medical decisions.`,
  investments: `You are LifeOS Investment Analyst.
You understand crypto, stocks, portfolio management, and market analysis. Give balanced, educational investment guidance.
Always mention that this is not financial advice.`,
  goals: `You are LifeOS Life Coach.
You help users set meaningful goals, break them into milestones, stay motivated, and track progress.
Be encouraging and strategic.`,
  wellness: `You are LifeOS Wellness Guide.
You support mental health, stress management, mindfulness, and emotional wellbeing.
Be compassionate, supportive, and practical.`,
  study: `You are LifeOS Study Buddy.
You explain concepts clearly, create quizzes, summarize content, and build study plans.
Adapt to any subject the user needs help with.`,
  coach: `You are LifeOS Life Coach.
You provide weekly life reviews, help users reflect on progress, identify patterns, and create action plans across all life areas.`,
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    )

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const { messages, mode = 'general' } = await req.json()
    const systemPrompt = SYSTEM_PROMPTS[mode] || SYSTEM_PROMPTS.general

    // 1. Call Groq's OpenAI-compatible endpoint
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('GROQ_API_KEY')!}`,
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192', // High-tier open-source model
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`)
    }

    const groqData = await response.json()
    const aiText = groqData.choices?.[0]?.message?.content || ''

    // 2. Format response to match Anthropic schema so your frontend doesn't break
    const anthropicCompatibleData = {
      content: [
        {
          type: 'text',
          text: aiText
        }
      ]
    }

    return new Response(JSON.stringify(anthropicCompatibleData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})