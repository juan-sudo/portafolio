import { useEffect, useRef, useState } from 'react'
import { experience, profile, projects, skills } from '../../data/portfolio'
import { ChatIcon, CloseIcon, SendIcon } from './Icons'

const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL || 'http://localhost:8787/api/chat'

const WELCOME_MESSAGE = {
  role: 'assistant',
  content: '¡Hola! Soy el asistente virtual de este portafolio. Pregúntame lo que quieras: sobre los proyectos, tecnologías, o cualquier otro tema.',
}

function buildPortfolioContext() {
  const skillList = skills.map((skill) => `${skill.name} (${skill.category})`).join(', ')
  const experienceList = experience
    .map((job) => `- ${job.role} en ${job.company} (${job.period}): ${job.description} Tecnologías: ${job.technologies.join(', ')}.`)
    .join('\n')
  const projectList = projects
    .map((project) => `- ${project.title}: ${project.description} Tecnologías: ${project.technologies.join(', ')}.`)
    .join('\n')

  return [
    `Nombre: ${profile.name}. Rol: ${profile.role}.`,
    profile.description,
    `Tecnologías: ${skillList}.`,
    `Experiencia laboral:\n${experienceList}`,
    `Proyectos destacados:\n${projectList}`,
  ].join('\n\n')
}

const PORTFOLIO_CONTEXT = buildPortfolioContext()

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const listRef = useRef(null)

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages, loading, open])

  async function sendMessage(event) {
    event.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    const nextMessages = [...messages, { role: 'user', content: text }]
    setMessages(nextMessages)
    setInput('')
    setError(null)
    setLoading(true)

    try {
      const response = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
          context: PORTFOLIO_CONTEXT,
        }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Error al contactar al chat.')
      setMessages((current) => [...current, { role: 'assistant', content: data.reply || 'No obtuve respuesta.' }])
    } catch {
      setError('No se pudo enviar el mensaje. Intenta de nuevo en unos segundos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="chat-widget">
      {open && (
        <div className="chat-panel" role="dialog" aria-modal="true" aria-label="Chat de asistencia">
          <div className="chat-panel-header">
            <span>Asistente virtual</span>
            <button className="icon-button" type="button" onClick={() => setOpen(false)} aria-label="Cerrar chat">
              <CloseIcon />
            </button>
          </div>
          <div className="chat-messages" ref={listRef}>
            {messages.map((message, index) => (
              <div className={message.role === 'user' ? 'chat-bubble chat-bubble-user' : 'chat-bubble chat-bubble-assistant'} key={index}>
                {message.content}
              </div>
            ))}
            {loading && (
              <div className="chat-bubble chat-bubble-assistant chat-typing" aria-label="Escribiendo">
                <span /><span /><span />
              </div>
            )}
          </div>
          {error && <p className="chat-error">{error}</p>}
          <form className="chat-form" onSubmit={sendMessage}>
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Escribe tu pregunta..."
              aria-label="Mensaje"
            />
            <button type="submit" className="icon-button" aria-label="Enviar" disabled={loading || !input.trim()}>
              <SendIcon />
            </button>
          </form>
        </div>
      )}
      <button className="chat-toggle" type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? 'Cerrar chat' : 'Abrir chat'}>
        {open ? <CloseIcon /> : <ChatIcon />}
      </button>
    </div>
  )
}
