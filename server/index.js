import 'dotenv/config'
import express from 'express'
import cors from 'cors'

const OLLAMA_API_KEY = process.env.OLLAMA_API_KEY
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'gpt-oss:120b'
const GROQ_API_KEY = process.env.GROQ_API_KEY
const GROQ_MODEL = process.env.GROQ_MODEL || 'openai/gpt-oss-120b'
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*'
const PORT = process.env.PORT || 8787
const MAX_REQUESTS_PER_MINUTE = 12

const SYSTEM_PROMPT = 'Eres el asistente virtual del portafolio de Juan de la Cruz Huamani, un desarrollador full stack. Responde de forma clara, breve y amigable en español, en texto plano sin markdown (sin asteriscos, sin almohadillas, sin listas con guiones; usa oraciones u oraciones separadas por saltos de línea). Puedes responder preguntas generales de cualquier tema, pero cuando te pregunten sobre Juan, su experiencia, tecnologías o proyectos, usa EXCLUSIVAMENTE la información verificada que se te entrega a continuación; nunca inventes tecnologías, empleos o proyectos que no estén ahí.'

const app = express()
app.use(cors({ origin: ALLOWED_ORIGIN }))
app.use(express.json({ limit: '60kb' }))

const requestLog = new Map()

function isRateLimited(ip) {
  const now = Date.now()
  const windowStart = now - 60_000
  const timestamps = (requestLog.get(ip) || []).filter((t) => t > windowStart)
  timestamps.push(now)
  requestLog.set(ip, timestamps)
  return timestamps.length > MAX_REQUESTS_PER_MINUTE
}

app.post('/api/chat', async (req, res) => {
  if (!OLLAMA_API_KEY) {
    return res.status(500).json({ error: 'El servidor no tiene configurada OLLAMA_API_KEY.' })
  }

  if (isRateLimited(req.ip)) {
    return res.status(429).json({ error: 'Demasiadas solicitudes. Espera un momento.' })
  }

  const { messages, context } = req.body
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Se requiere un arreglo de mensajes.' })
  }

  const safeMessages = messages
    .filter((m) => m && typeof m.content === 'string' && (m.role === 'user' || m.role === 'assistant'))
    .slice(-20)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }))

  const systemPrompt = typeof context === 'string' && context.trim()
    ? `${SYSTEM_PROMPT}\n\nInformación verificada sobre Juan:\n${context.slice(0, 4000)}`
    : SYSTEM_PROMPT

  try {
    const response = await fetch('https://ollama.com/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OLLAMA_API_KEY}`,
      },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages: [{ role: 'system', content: systemPrompt }, ...safeMessages],
        stream: false,
      }),
    })

    if (!response.ok) {
      const text = await response.text()
      console.error('Ollama error:', response.status, text)
      return res.status(502).json({ error: 'El servicio de IA no respondió correctamente.' })
    }

    const data = await response.json()
    res.json({ reply: data.message?.content ?? 'No obtuve una respuesta.' })
  } catch (error) {
    console.error('Chat proxy error:', error)
    res.status(502).json({ error: 'No se pudo contactar al servicio de IA.' })
  }
})

app.post('/api/learn-chat', async (req, res) => {
  if (!GROQ_API_KEY) {
    return res.status(500).json({ error: 'El servidor no tiene configurada GROQ_API_KEY.' })
  }

  if (isRateLimited(req.ip)) {
    return res.status(429).json({ error: 'Demasiadas solicitudes. Espera un momento.' })
  }

  const { messages, context } = req.body
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Se requiere un arreglo de mensajes.' })
  }

  const safeMessages = messages
    .filter((message) => message && typeof message.content === 'string' && (message.role === 'user' || message.role === 'assistant'))
    .slice(-20)
    .map((message) => ({ role: message.role, content: message.content.slice(0, 2000) }))

  if (safeMessages.length === 0 || safeMessages[safeMessages.length - 1].role !== 'user') {
    return res.status(400).json({ error: 'El último mensaje debe ser una pregunta del usuario.' })
  }

  const systemPrompt = [
    'Eres un ingeniero de software senior que enseña programación a principiantes. Tu tono es profesional, preciso y cercano: sin relleno, sin saludos largos y sin repetir la pregunta.',
    'Responde siempre en español neutro y sigue esta estructura, omitiendo las partes que no apliquen: 1) Respuesta directa en una o dos oraciones. 2) Explicación del porqué, paso a paso, definiendo cada término técnico la primera vez que aparece. 3) Un ejemplo mínimo en un bloque de código, con el resultado esperado. 4) Errores comunes o buenas prácticas usadas en proyectos reales. 5) Una forma breve de comprobarlo o practicarlo.',
    'Usa la terminología correcta de la industria (por ejemplo: prompt de la terminal, intérprete, argumento, variable de entorno) y aclara las diferencias entre sistemas operativos o versiones cuando sean relevantes.',
    'Prioriza la exactitud: si no estás seguro de algo, dilo; si la pregunta es ambigua, pide una aclaración concreta. No inventes datos del curso ni presentes suposiciones como hechos.',
    'Responde cualquier pregunta del estudiante, aunque no esté en las lecciones del módulo o trate de otro lenguaje, herramienta o tema: nunca contestes que algo está fuera del curso. El contexto del módulo es solo una referencia para adaptar el nivel de la explicación y, cuando ayude, relacionarla con lo que el estudiante está viendo. Si pregunta por un tema de las lecciones, explícalo con tus propias palabras y con más profundidad que la lección.',
    'Formato: párrafos cortos separados por una línea en blanco. Escribe el código de varias líneas en bloques delimitados por ``` con el nombre del lenguaje, y los comandos o identificadores sueltos entre comillas invertidas simples. Puedes resaltar términos clave con **negrita**. No uses títulos con almohadillas ni tablas.',
    typeof context === 'string' && context.trim()
      ? `Contexto del módulo y lecciones disponibles:\n${context.slice(0, 6000)}`
      : '',
  ].filter(Boolean).join('\n\n')

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [{ role: 'system', content: systemPrompt }, ...safeMessages],
        temperature: 0.4,
        max_tokens: 3000,
        stream: false,
      }),
    })

    if (!response.ok) {
      const text = await response.text()
      console.error('Groq learning assistant error:', response.status, text)
      return res.status(502).json({ error: 'El asistente de aprendizaje no respondió correctamente.' })
    }

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content
    if (typeof reply !== 'string' || !reply.trim()) {
      console.error('Groq learning assistant returned an empty response.')
      return res.status(502).json({ error: 'El asistente de aprendizaje devolvió una respuesta vacía.' })
    }
    return res.json({ reply })
  } catch (error) {
    console.error('Learning assistant proxy error:', error)
    return res.status(502).json({ error: 'No se pudo contactar al asistente de aprendizaje.' })
  }
})

app.post('/api/learn-exam', async (req, res) => {
  if (!GROQ_API_KEY) {
    return res.status(500).json({ error: 'El servidor no tiene configurada GROQ_API_KEY.' })
  }

  if (isRateLimited(req.ip)) {
    return res.status(429).json({ error: 'Demasiadas solicitudes. Espera un momento.' })
  }

  const { context, avoid } = req.body
  const interview = req.body.interview === true
  const count = Math.min(Math.max(Number.parseInt(req.body.count, 10) || 5, 1), 10)
  if (typeof context !== 'string' || !context.trim()) {
    return res.status(400).json({ error: 'Se requiere el contenido del nivel.' })
  }

  const previous = Array.isArray(avoid)
    ? avoid.filter((item) => typeof item === 'string').slice(-20).map((item) => `- ${item.slice(0, 200)}`).join('\n')
    : ''

  const systemPrompt = [
    'Eres un ingeniero de software senior que redacta exámenes técnicos de opción múltiple para estudiantes de programación.',
    `Genera exactamente ${count} preguntas en español basadas ÚNICAMENTE en el contenido del nivel que te entrega el usuario. La dificultad debe corresponder a ese nivel: no evalúes temas que el estudiante todavía no vio.`,
    interview
      ? 'Este es un simulacro de entrevista técnica. Formula preguntas originales como las de una entrevista real: presenta situaciones de diseño o depuración, pide elegir la mejor decisión y evalúa comprensión de trade-offs, ciclo de vida, rendimiento, seguridad y buenas prácticas que aparezcan en el contenido. Evita trivia y definiciones memorizadas. Cada pregunta debe tener una única mejor respuesta defendible.'
      : 'Varía los tipos de pregunta: predecir el resultado de un fragmento de código, completar el código (marca el espacio con _____), completar una oración con el término técnico correcto, detectar el error de un fragmento, elegir el comando o la sintaxis correcta, y conceptos aplicados. Evita las preguntas de memoria sobre títulos de lecciones. Reparte las preguntas entre los temas y los lenguajes del nivel.',
    'Cada pregunta tiene exactamente 4 alternativas distintas, breves y verosímiles, y una sola correcta sin ambigüedad. Verifica mentalmente cada fragmento de código antes de fijar la respuesta: el resultado debe ser exactamente el que produciría al ejecutarse. Las tres alternativas incorrectas deben ser realmente incorrectas: si dos formas son válidas (por ejemplo, una opción corta y su forma larga), no las pongas juntas. No uses «todas las anteriores» ni «ninguna de las anteriores».',
    'Responde solo con un objeto JSON con esta forma: {"questions":[{"prompt":"enunciado, indicando el lenguaje si aplica","code":"fragmento de código o texto a completar, o cadena vacía","options":["a","b","c","d"],"answerIndex":0,"explanation":"por qué es correcta, en una o dos oraciones"}]}. answerIndex es la posición (0 a 3) de la alternativa correcta. No uses markdown dentro de los textos.',
    previous ? `Este estudiante ya respondió estas preguntas; escribe otras distintas, con otros ejemplos y valores:\n${previous}` : '',
  ].filter(Boolean).join('\n\n')

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Contenido del nivel:\n${context.slice(0, 9000)}` },
        ],
        temperature: 0.9,
        max_tokens: 4000,
        response_format: { type: 'json_object' },
        stream: false,
      }),
    })

    if (!response.ok) {
      const text = await response.text()
      console.error('Groq exam error:', response.status, text)
      return res.status(502).json({ error: 'El generador de exámenes no respondió correctamente.' })
    }

    const data = await response.json()
    let parsed
    try {
      parsed = JSON.parse(data.choices?.[0]?.message?.content ?? '')
    } catch {
      parsed = null
    }

    const text = (value) => (typeof value === 'string' ? value.trim() : '')
    const questions = (Array.isArray(parsed?.questions) ? parsed.questions : [])
      .map((question) => {
        const options = Array.isArray(question?.options) ? question.options.map((option) => text(String(option))) : []
        return {
          prompt: text(question?.prompt),
          material: text(question?.code),
          options,
          answer: options[question?.answerIndex],
          explanation: text(question?.explanation),
        }
      })
      .filter((question) => (
        question.prompt
        && question.options.length === 4
        && question.options.every(Boolean)
        && new Set(question.options).size === 4
        && question.answer
      ))
      .slice(0, count)

    if (questions.length < count) {
      console.error(`Groq exam returned ${questions.length} valid questions of ${count}.`)
      return res.status(502).json({ error: 'El generador de exámenes devolvió preguntas incompletas.' })
    }
    return res.json({ questions })
  } catch (error) {
    console.error('Exam proxy error:', error)
    return res.status(502).json({ error: 'No se pudo contactar al generador de exámenes.' })
  }
})

app.get('/health', (_req, res) => res.json({ ok: true }))

app.listen(PORT, () => {
  console.log(`Chat backend escuchando en el puerto ${PORT}`)
})
