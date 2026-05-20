import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const SYSTEM_PROMPTS: Record<string, string> = {
  general: `You are LifeOS Assistant — a warm, expert personal life advisor. Help users manage finances, health, investments, and goals. Be concise, friendly, and actionable. Use bullet points and bold for clarity.`,
  finance: `You are LifeOS Finance Advisor. Expert in personal finance, budgeting, debt management, and wealth building. Give specific, actionable financial advice based on the user's situation.`,
  health: `You are LifeOS Health Advisor. Provide wellness guidance, track health goals, and give evidence-based information. Remind users to consult professionals for medical decisions.`,
  investments: `You are LifeOS Investment Analyst. Understand crypto, stocks, portfolio management, and market analysis. Give balanced, educational investment guidance. Always mention this is not financial advice.`,
  goals: `You are LifeOS Life Coach. Help users set meaningful goals, break them into milestones, stay motivated, and track progress. Be encouraging and strategic.`,
  wellness: `You are LifeOS Wellness Guide. Support mental health, stress management, mindfulness, and emotional wellbeing. Be compassionate, supportive, and practical.`,
  study: `You are LifeOS Study Buddy. Explain concepts clearly, create quizzes, summarize content, and build study plans. Adapt to any subject.`,
  coach: `You are LifeOS Life Coach. Provide weekly life reviews, help users reflect on progress, identify patterns, and create action plans across all life areas.`,
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
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
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

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Messages array is required and cannot be empty." }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // 1. Initialize contents and inject the system prompt as the core structural context frame
    const geminiContents = [
      {
        role: 'user',
        parts: [{ text: `SYSTEM INSTRUCTION / CONTEXT ARCHITECTURE (Adhere to this strictly for all responses):\n${systemPrompt}` }]
      },
      {
        role: 'model',
        parts: [{ text: 'Understood. I will adopt this persona and follow these instructions perfectly for the duration of our session.' }]
      }
    ]

    // 2. Append the frontend conversation thread history cleanly
    messages.forEach((m: any) => {
      const rawText = m.content || m.text || '';
      if (!rawText.trim()) return;

      geminiContents.push({
        role: m.role === 'assistant' || m.sender === 'system' ? 'model' : 'user',
        parts: [{ text: rawText }]
      });
    });

    const apiKey = Deno.env.get('GEMINI_API_KEY')!
    
    // 3. Fire request to Google's strict v1 REST endpoint with the optimized contents array
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: geminiContents,
        generationConfig: { 
          maxOutputTokens: 1000, 
          temperature: 0.7 
        }
      }),
    })

    if (!response.ok) {
      const rawErrorText = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${rawErrorText}`)
    }

    const geminiData = await response.json()
    const aiText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || ''

    const anthropicCompatibleData = {
      content: [{ type: 'text', text: aiText }]
    }

    return new Response(JSON.stringify(anthropicCompatibleData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error("🚨 DETAILED BACKEND CRASH LOG:", error)
    return new Response(JSON.stringify({ 
      error: String(error),
      message: error instanceof Error ? error.message : "Unknown backend failure"
    }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})