import 'dotenv/config'
import express from 'express'
import cors from 'cors'

const OLLAMA_API_KEY = process.env.OLLAMA_API_KEY
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'gpt-oss:120b'
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*'
const PORT = process.env.PORT || 8787
const MAX_REQUESTS_PER_MINUTE = 12

const SYSTEM_PROMPT = 'Eres el asistente virtual del portafolio de Juan de la Cruz Huamani, un desarrollador full stack. Responde de forma clara, breve y amigable en español, en texto plano sin markdown (sin asteriscos, sin almohadillas, sin listas con guiones; usa oraciones u oraciones separadas por saltos de línea). Puedes responder preguntas generales de cualquier tema, pero cuando te pregunten sobre Juan, su experiencia, tecnologías o proyectos, usa EXCLUSIVAMENTE la información verificada que se te entrega a continuación; nunca inventes tecnologías, empleos o proyectos que no estén ahí.'

const app = express()
app.use(cors({ origin: ALLOWED_ORIGIN }))
app.use(express.json({ limit: '20kb' }))

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

app.get('/health', (_req, res) => res.json({ ok: true }))

app.listen(PORT, () => {
  console.log(`Chat backend escuchando en el puerto ${PORT}`)
})
