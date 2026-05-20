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
    if (!authHeader) throw new Error('Missing Authorization header')

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    )

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) throw new Error('Unauthorized user session')

    const { messages, mode = 'general' } = await req.json()
    const systemPrompt = SYSTEM_PROMPTS[mode] || SYSTEM_PROMPTS.general

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      throw new Error("Messages array is empty.")
    }

    // 1. Map messages strictly to the simplest possible format
    const geminiContents = messages.map((m: any) => ({
      role: (m.role === 'assistant' || m.sender === 'system') ? 'model' : 'user',
      parts: [{ text: m.content || m.text || '...' }]
    })).filter((m: any) => m.parts[0].text.trim() !== '')

    // 2. Brute-force the system prompt into the very first message. 
    // This bypasses ALL Google versioning rules and schema validations.
    if (geminiContents.length > 0 && geminiContents[0].role === 'user') {
      geminiContents[0].parts[0].text = `[SYSTEM INSTRUCTIONS: ${systemPrompt}]\n\nUSER MESSAGE: ${geminiContents[0].parts[0].text}`
    } else {
      geminiContents.unshift({ role: 'user', parts: [{ text: `[SYSTEM INSTRUCTIONS: ${systemPrompt}]\n\nUSER MESSAGE: Hello` }] })
    }

    const apiKey = Deno.env.get('GEMINI_API_KEY')!
    
    // 3. Fire at the stable v1 endpoint
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: geminiContents,
        generationConfig: { maxOutputTokens: 1000, temperature: 0.7 }
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      throw new Error(`Gemini API Error ${response.status}: ${errText}`)
    }

    const geminiData = await response.json()
    const aiText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.'

    return new Response(JSON.stringify({ content: [{ type: 'text', text: aiText }] }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error("🚨 CRASH LOG:", error)
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})