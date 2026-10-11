import { useEffect, useRef, useState } from 'react'
import { LEARN_ROUTE, learnModules } from '../../data/learn'
import { canRun } from '../../lib/runners'
import { SendIcon } from '../ui/Icons'
import { CodeMessage } from './CodeMessage'

const COMPARISON_ID = 'vs'
const TYPING_DELAY_MS = 900

const normalize = (text) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()
const words = (text) => normalize(text).split(/[^a-z0-9]+/).filter((word) => word.length >= 4)

let nextEntryId = 0
const newEntryId = () => ++nextEntryId

function buildChats({ levels, comparison }) {
  return [
    ...levels.map((level) => ({
      id: `nivel-${level.level}`,
      avatar: level.level,
      name: `Nivel ${level.level} · ${level.title}`,
      items: level.topics,
    })),
    {
      id: COMPARISON_ID,
      avatar: 'VS',
      name: comparison.title,
      items: comparison.rows.map((row) => ({ ...row, title: row.label })),
    },
  ]
}

// Busca el tema que mejor coincide con lo que escribió el usuario
function findItem(query, items) {
  const text = normalize(query)
  if (!text) return null
  const exact = items.find((item) => normalize(item.title) === text)
  if (exact) return exact
  const partial = items.find((item) => normalize(item.title).includes(text) || text.includes(normalize(item.title)))
  if (partial) return partial

  const queryWords = words(query)
  let best = null
  let bestScore = 0
  items.forEach((item) => {
    const titleWords = words(item.title)
    const score = queryWords.filter((word) => titleWords.some((title) => title.startsWith(word) || word.startsWith(title))).length
    if (score > bestScore) {
      best = item
      bestScore = score
    }
  })
  return best
}

export function LearnChat({ module }) {
  const chats = buildChats(module)
  const [activeId, setActiveId] = useState(chats[0].id)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [history, setHistory] = useState({})

  const search = normalize(query)
  const visibleChats = chats
    .map((chat) => {
      const titles = chat.items.map((item) => item.title)
      if (!search) return { ...chat, preview: titles.join(' · ') }
      const matches = titles.filter((title) => normalize(title).includes(search))
      if (matches.length === 0 && !normalize(chat.name).includes(search)) return null
      return { ...chat, preview: (matches.length ? matches : titles).join(' · ') }
    })
    .filter(Boolean)

  const activeIndex = chats.findIndex((chat) => chat.id === activeId)
  const activeChat = chats[activeIndex]
  const askedTitles = (chatId) => new Set((history[chatId] ?? []).filter((entry) => entry.kind === 'answer').map((entry) => entry.title))
  const pendingCount = (chat) => {
    const asked = askedTitles(chat.id)
    return chat.items.filter((item) => !asked.has(item.title)).length
  }

  const openChat = (id) => {
    setActiveId(id)
    setIsChatOpen(true)
  }

  // Devuelve el id de la respuesta para que la conversación muestre "escribiendo…" antes de ella
  const send = (text) => {
    const item = findItem(text, activeChat.items)
    const question = { id: newEntryId(), kind: 'question', text: item ? item.title : text }
    let reply

    if (item) {
      reply = { id: newEntryId(), kind: 'answer', title: item.title }
    } else {
      const other = chats.find((chat) => chat.id !== activeChat.id && findItem(text, chat.items))
      reply = other
        ? { id: newEntryId(), kind: 'redirect', chatId: other.id, chatName: other.name, title: findItem(text, other.items).title }
        : { id: newEntryId(), kind: 'unknown' }
    }

    setHistory((current) => ({ ...current, [activeChat.id]: [...(current[activeChat.id] ?? []), question, reply] }))
    return reply.id
  }

  return (
    <div className={isChatOpen ? 'wa wa-chat-open' : 'wa'}>
      <aside className="wa-sidebar" aria-label="Temas">
        <div className="wa-sidebar-header">
          <h1>Aprende a programar</h1>
        </div>
        <div className="wa-search">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar un tema"
            aria-label="Buscar un tema"
          />
        </div>
        <nav className="wa-chips" aria-label="Módulos de aprendizaje">
          {learnModules.map((item) => (
            <a
              key={item.id}
              href={`${LEARN_ROUTE}/${item.id}`}
              className={item.id === module.id ? 'wa-chip is-active' : 'wa-chip'}
              aria-current={item.id === module.id ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <ul className="wa-chat-list">
          {visibleChats.map((chat) => {
            const pending = pendingCount(chat)
            return (
              <li key={chat.id}>
                <button
                  type="button"
                  className={chat.id === activeId ? 'wa-chat-item is-active' : 'wa-chat-item'}
                  aria-current={chat.id === activeId ? 'true' : undefined}
                  onClick={() => openChat(chat.id)}
                >
                  <span className={chat.id === COMPARISON_ID ? 'wa-avatar wa-avatar-compact' : 'wa-avatar'}>{chat.avatar}</span>
                  <span className="wa-chat-item-body">
                    <span className="wa-chat-item-top">
                      <span className="wa-chat-item-name">{chat.name}</span>
                      {pending > 0
                        ? <span className="wa-chat-item-count" aria-label={`${pending} temas por ver`}>{pending}</span>
                        : <span className="wa-chat-item-done" aria-label="Completado">✓✓</span>}
                    </span>
                    <span className="wa-chat-item-preview">{chat.preview}</span>
                  </span>
                </button>
              </li>
            )
          })}
          {visibleChats.length === 0 && <li className="wa-empty">No hay temas que coincidan con “{query}”.</li>}
        </ul>
      </aside>

      <Conversation
        key={`${module.id}-${activeChat.id}`}
        module={module}
        chat={activeChat}
        entries={history[activeChat.id] ?? []}
        askedTitles={askedTitles(activeChat.id)}
        nextChat={chats[activeIndex + 1]}
        onSend={send}
        onOpenChat={openChat}
        onBack={() => setIsChatOpen(false)}
      />
    </div>
  )
}

function Conversation({ module, chat, entries, askedTitles, nextChat, onSend, onOpenChat, onBack }) {
  const [draft, setDraft] = useState('')
  const [typingId, setTypingId] = useState(null)
  const messagesRef = useRef(null)
  const inputRef = useRef(null)
  const timeoutRef = useRef(null)
  const isComparison = chat.id === COMPARISON_ID

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  useEffect(() => {
    const list = messagesRef.current
    if (list) list.scrollTo({ top: list.scrollHeight, behavior: 'smooth' })
  }, [entries.length, typingId])

  const remaining = chat.items.filter((item) => !askedTitles.has(item.title))
  const filter = normalize(draft)
  const suggestions = filter ? remaining.filter((item) => normalize(item.title).includes(filter)) : remaining

  const submit = (event) => {
    event.preventDefault()
    if (!draft.trim() || typingId) return
    const replyId = onSend(draft)
    setDraft('')
    setTypingId(replyId)
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setTypingId(null), TYPING_DELAY_MS)
  }

  const selectSuggestion = (title) => {
    setDraft(title)
    inputRef.current?.focus()
  }

  return (
    <section className="wa-conversation" aria-label={chat.name}>
      <header className="wa-conversation-header">
        <button className="wa-back" type="button" onClick={onBack} aria-label="Volver a la lista de temas">←</button>
        <span className={isComparison ? 'wa-avatar wa-avatar-compact' : 'wa-avatar'}>{chat.avatar}</span>
        <span className="wa-conversation-title">
          <strong>{chat.name}</strong>
          <span>{typingId ? 'escribiendo…' : module.subtitle ?? `${module.label}: ${module.languages.map((language) => language.label).join(', ')}`}</span>
        </span>
      </header>

      <div className="wa-messages" ref={messagesRef}>
        <p className="wa-system">{module.description}</p>
        <div className="wa-thread">
          <div className="wa-bubble wa-bubble-in">
            <span className="wa-sender wa-sender-juan">Juan de la Cruz</span>
            <p>
              {isComparison
                ? `¡Hola! Elige un criterio de abajo o escribe tu consulta, y te cuento cómo se comparan ${module.comparison.languages.join(', ')}.`
                : `¡Hola! Elige un tema de abajo o escribe tu consulta y pulsa enviar. Te respondo con ejemplos en ${module.languages.map((language) => language.label).join(', ')}.`}
            </p>
          </div>
        </div>

        {entries.map((entry, index) => {
          if (entry.kind === 'question') {
            const reply = entries[index + 1]
            return (
              <div className="wa-thread" key={entry.id}>
                <OutgoingBubble>{entry.text}</OutgoingBubble>
                {reply && reply.id === typingId && <TypingBubble />}
                {reply && reply.id !== typingId && (
                  <Reply entry={reply} chat={chat} module={module} onOpenChat={onOpenChat} />
                )}
              </div>
            )
          }
          return null
        })}
      </div>

      <footer className="wa-composer">
        <div className="wa-suggestions" aria-label="Sugerencias">
          {suggestions.map((item) => (
            <button key={item.title} type="button" className="wa-suggestion" onClick={() => selectSuggestion(item.title)}>
              {item.title}
            </button>
          ))}
          {remaining.length === 0 && nextChat && (
            <button type="button" className="wa-suggestion wa-suggestion-next" onClick={() => onOpenChat(nextChat.id)}>
              Siguiente: {nextChat.name} →
            </button>
          )}
          {remaining.length === 0 && !nextChat && (
            <span className="wa-suggestion-done">¡Terminaste el módulo de {module.label}!</span>
          )}
        </div>
        <form className="wa-composer-form" onSubmit={submit}>
          <input
            ref={inputRef}
            className="wa-composer-field"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={isComparison ? 'Elige o escribe un criterio' : 'Elige o escribe un tema'}
            aria-label="Escribe tu consulta"
          />
          <button className="wa-composer-send" type="submit" disabled={!draft.trim() || Boolean(typingId)} aria-label="Enviar">
            <SendIcon />
          </button>
        </form>
      </footer>
    </section>
  )
}

function OutgoingBubble({ children }) {
  return (
    <div className="wa-bubble wa-bubble-out">
      {children}
      <span className="wa-ticks" aria-label="Leído">✓✓</span>
    </div>
  )
}

function TypingBubble() {
  return (
    <div className="wa-bubble wa-bubble-in wa-typing-wrap" role="status" aria-label="Escribiendo">
      <span className="wa-typing" aria-hidden="true"><span /><span /><span /></span>
    </div>
  )
}

function JuanBubble({ children }) {
  return (
    <div className="wa-bubble wa-bubble-in">
      <span className="wa-sender wa-sender-juan">Juan de la Cruz</span>
      {children}
    </div>
  )
}

function Reply({ entry, chat, module, onOpenChat }) {
  if (entry.kind === 'unknown') {
    return <JuanBubble><p>Aún no tengo una lección sobre eso en este chat. Prueba con alguna de las sugerencias de abajo.</p></JuanBubble>
  }

  if (entry.kind === 'redirect') {
    return (
      <JuanBubble>
        <p>“{entry.title}” está en el chat <strong>{entry.chatName}</strong>.</p>
        <button className="wa-run" type="button" onClick={() => onOpenChat(entry.chatId)}>Abrir ese chat →</button>
      </JuanBubble>
    )
  }

  const item = chat.items.find((candidate) => candidate.title === entry.title)

  if (chat.id === COMPARISON_ID) {
    const { languages } = module.comparison
    return (
      <JuanBubble>
        <dl className="wa-compare">
          {item.values.map((value, index) => (
            <div key={languages[index]}>
              <dt>{languages[index]}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </JuanBubble>
    )
  }

  return (
    <>
      {item.prompt && (
        <JuanBubble>
          <div className="wa-exercise-prompt">
            <strong>Reto</strong>
            <p>{item.prompt}</p>
            {item.note && <span>{item.note}</span>}
          </div>
        </JuanBubble>
      )}
      {module.languages.map(({ key, label }, index) => (
        <div className="wa-reveal" style={{ animationDelay: `${index * 0.25}s` }} key={key}>
      {item.code ? (
        <CodeMessage
          language={key}
          runnable={canRun(key) && !item.fixed?.includes(key)}
          sender={label}
          senderClass={`wa-sender-${index}`}
          code={item[key]}
          output={item.output?.[key]}
          note={item.note}
          outputLabel={module.outputLabel}
          stdin={item.stdin}
          exercise={item.exercise}
          setup={item.setup?.[key]}
          files={item.files?.[key]}
          mainFile={item.mainFile}
          driver={item.driver}
          middleware={item.middleware}
        />
      ) : item.session ? (
        <div className="wa-bubble wa-bubble-in wa-bubble-code">
          <span className={`wa-sender wa-sender-${index}`}>{label}</span>
          <pre className="wa-code wa-session"><code>{item[key]}</code></pre>
          {item.note && <span className="wa-output-note">{item.note}</span>}
        </div>
      ) : (
        <div className="wa-bubble wa-bubble-in">
          <span className={`wa-sender wa-sender-${index}`}>{label}</span>
          <p className="wa-text"><Linkify text={item[key]} /></p>
        </div>
      )}
        </div>
      ))}
    </>
  )
}

// Convierte las direcciones web del texto en enlaces
function Linkify({ text }) {
  return text.split(/(https?:\/\/[^\s]+)/g).map((part, index) => (
    /^https?:\/\//.test(part)
      ? <a key={index} href={part} target="_blank" rel="noreferrer">{part.replace(/^https?:\/\//, '')}</a>
      : part
  ))
}
