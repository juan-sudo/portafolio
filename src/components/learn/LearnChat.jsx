import { useEffect, useRef, useState } from 'react'
import { LEARN_ROUTE, learnModules } from '../../data/learn'
import { buildExamQuestions, shuffle } from '../../lib/examQuestions'
import { canRun, loadingMessage, runCode } from '../../lib/runners'
import { MoonIcon, PlayIcon, SendIcon, SunIcon } from '../ui/Icons'
import { CopyButton } from '../ui/CopyButton'
import { CodeMessage, RunResult } from './CodeMessage'

const COMPARISON_ID = 'vs'
const FINAL_EXAM_ID = 'examen-final'
const TYPING_DELAY_MS = 900
const EXAM_PASS_RATE = 0.7
const LEARN_CHAT_API_URL = import.meta.env.VITE_LEARN_CHAT_API_URL || 'http://localhost:8787/api/learn-chat'
const LEARN_EXAM_API_URL = import.meta.env.VITE_LEARN_EXAM_API_URL || LEARN_CHAT_API_URL.replace(/learn-chat$/, 'learn-exam')
const EXAM_TIMEOUT_MS = 45_000
const EXAM_CONTEXT_LIMIT = 8_000
const EXAM_SEEN_LIMIT = 20
const COMPOSER_MAX_ROWS = 8

// Acciones rápidas bajo la última respuesta del tutor: pistas, retos y explicación propia (Feynman)
const TUTOR_ACTIONS = [
  { label: 'Dame una pista', text: 'Dame una pista, sin darme la solución.' },
  { label: 'Ponme un reto', text: 'Ponme un reto corto sobre esto para practicar.' },
  { label: 'Lo explico yo', text: 'Quiero explicártelo con mis palabras para comprobar que lo entendí.' },
]
const CONVERT_LANGUAGES = ['Python', 'JavaScript', 'Java']

const normalize = (text) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()

let nextEntryId = 0
const newEntryId = () => ++nextEntryId

function buildChats({ levels, comparison }) {
  return [
    ...levels.map((level, index) => ({
      id: `nivel-${level.level}-${index}`,
      index,
      avatar: level.level,
      name: `Nivel ${level.level} · ${level.title}`,
      interview: Boolean(level.interview),
      items: level.topics,
    })),
    {
      id: FINAL_EXAM_ID,
      type: 'final-exam',
      avatar: '★',
      name: 'Examen final',
      items: [],
    },
    {
      id: COMPARISON_ID,
      avatar: 'VS',
      name: comparison.title,
      items: comparison.rows.map((row) => ({ ...row, title: row.label })),
    },
  ]
}

// Solo devuelve una lección si el usuario escribió su título (completo o una parte);
// cualquier otra consulta es una pregunta libre y la responde el tutor IA
function findItem(query, items) {
  const text = normalize(query)
  if (text.length < 3) return null
  return items.find((item) => normalize(item.title) === text)
    ?? items.find((item) => normalize(item.title).includes(text))
    ?? null
}

// Resume las lecciones del nivel para que el tutor IA escriba preguntas acordes a lo visto
function buildExamContext(module, chat, topics) {
  const lessons = []
  let size = 0
  for (const topic of shuffle(topics)) {
    const parts = module.languages.flatMap(({ key, label }) => {
      const content = topic.examCode?.[key] ?? topic[key]
      if (typeof content !== 'string' || !content.trim()) return []
      const output = topic.expectedOutput?.[key] ?? topic.output?.[key]
      const result = typeof output === 'string' ? `\nResultado: ${output.slice(0, 120)}` : ''
      return [`${label}:\n${content.slice(0, 350)}${result}`]
    })
    const lesson = [`Tema: ${topic.title}`, topic.prompt, ...parts].filter(Boolean).join('\n')
    if (size + lesson.length > EXAM_CONTEXT_LIMIT) continue
    lessons.push(lesson)
    size += lesson.length
  }
  return [
    `Módulo: ${module.label}. ${chat.type === 'final-exam' ? 'Examen final de todo el módulo' : chat.name}.`,
    `Lenguajes: ${module.languages.map((language) => language.label).join(', ')}.`,
    ...lessons,
  ].join('\n\n')
}

function progressKey(moduleId, type, index) {
  return `learn-${moduleId}-${type}${index === undefined ? '' : `-${index}`}`
}

export function LearnChat({ module, theme, onToggleTheme }) {
  const chats = buildChats(module)
  const [activeId, setActiveId] = useState(chats[0].id)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [history, setHistory] = useState({})
  const [passedLevels, setPassedLevels] = useState(() => module.levels.map((_, index) => (
    localStorage.getItem(progressKey(module.id, 'level', index)) === 'passed'
  )))
  const [finalExamPassed, setFinalExamPassed] = useState(() => (
    localStorage.getItem(progressKey(module.id, 'final')) === 'passed'
  ))
  const [activeExam, setActiveExam] = useState(null)

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

  // Pide el examen al tutor IA con el contenido del nivel; si falla, usa las preguntas locales
  const startExam = (chat) => {
    const isFinal = chat.type === 'final-exam'
    const level = isFinal ? null : module.levels[chat.index]
    const topics = isFinal ? module.levels.flatMap((item) => item.topics) : level.topics
    const count = isFinal ? 10 : level.examCount ?? 5
    const exam = {
      id: newEntryId(),
      kind: isFinal ? 'final' : 'level',
      levelIndex: chat.index,
      interview: Boolean(chat.interview),
      questions: [],
      loading: true,
    }
    const seenKey = progressKey(module.id, 'exam-seen', isFinal ? 'final' : chat.index)
    const finish = (questions, source) => setActiveExam((current) => (
      current?.id === exam.id ? { ...exam, loading: false, source, questions } : current
    ))
    setActiveExam(exam)

    let seen = []
    try {
      seen = JSON.parse(localStorage.getItem(seenKey)) ?? []
    } catch {
      seen = []
    }

    fetch(LEARN_EXAM_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        context: buildExamContext(module, chat, topics),
        count,
        avoid: seen,
        interview: Boolean(chat.interview),
      }),
      signal: AbortSignal.timeout(EXAM_TIMEOUT_MS),
    })
      .then(async (response) => {
        const data = await response.json()
        if (!response.ok) throw new Error(data.error || 'No se pudo generar el examen.')
        if (!Array.isArray(data.questions) || data.questions.length < count) throw new Error('Examen incompleto.')
        const asked = data.questions.map((question) => `${question.prompt} ${question.material}`.trim().slice(0, 200))
        localStorage.setItem(seenKey, JSON.stringify([...seen, ...asked].slice(-EXAM_SEEN_LIMIT)))
        finish(data.questions.map((question, index) => ({
          ...question,
          id: `ai-${exam.id}-${index}`,
          options: shuffle(question.options),
        })), 'ai')
      })
      .catch((error) => {
        console.error('No se pudo generar el examen con el tutor IA:', error)
        finish(buildExamQuestions(topics, module, count), 'local')
      })
  }

  const openChat = (id) => {
    const chat = chats.find((item) => item.id === id)
    if (!chat) return
    setActiveId(id)
    setIsChatOpen(true)
    setActiveExam(chat.type === 'final-exam' ? activeExam : null)
    if (chat.type === 'final-exam') startExam(chat)
  }

  const markExamPassed = (exam) => {
    if (exam.kind === 'final') {
      localStorage.setItem(progressKey(module.id, 'final'), 'passed')
      setFinalExamPassed(true)
      return
    }

    localStorage.setItem(progressKey(module.id, 'level', exam.levelIndex), 'passed')
    setPassedLevels((current) => current.map((passed, index) => (
      index === exam.levelIndex ? true : passed
    )))
  }

  // Devuelve el id de la respuesta para que la conversación muestre "escribiendo…" antes de ella
  // forceAi salta la búsqueda de lecciones: lo usan las acciones rápidas del tutor
  const send = (text, { forceAi = false } = {}) => {
    const item = forceAi ? null : findItem(text, activeChat.items)
    const question = { id: newEntryId(), kind: 'question', text: item ? item.title : text }
    const currentHistory = history[activeChat.id] ?? []
    let reply

    if (item) {
      reply = { id: newEntryId(), kind: 'answer', title: item.title }
    } else {
      const other = forceAi ? null : chats.find((chat) => chat.id !== activeChat.id && findItem(text, chat.items))
      reply = other
        ? { id: newEntryId(), kind: 'redirect', chatId: other.id, chatName: other.name, title: findItem(text, other.items).title }
        : { id: newEntryId(), kind: 'ai-pending' }
    }

    setHistory((current) => ({ ...current, [activeChat.id]: [...(current[activeChat.id] ?? []), question, reply] }))
    if (reply.kind === 'ai-pending') {
      const messages = currentHistory.flatMap((entry) => {
        if (entry.kind === 'question') return [{ role: 'user', content: entry.text }]
        if (entry.kind === 'ai') return [{ role: 'assistant', content: entry.content }]
        // El tutor necesita saber qué código vio el estudiante para proponer un reto parecido
        if (entry.kind === 'answer') {
          const lesson = activeChat.items.find((candidate) => candidate.title === entry.title)
          const code = module.languages
            .map(({ key, label }) => (typeof lesson?.[key] === 'string' ? `${label}:\n${lesson[key].slice(0, 550)}` : null))
            .filter(Boolean)
            .join('\n\n')
          return [{ role: 'assistant', content: `Lección mostrada al estudiante: «${entry.title}».\n\n${code}` }]
        }
        return []
      })
      messages.push({ role: 'user', content: text })

      const lessonContext = [
        `Módulo: ${module.label}.`,
        `Chat actual: ${activeChat.name}.`,
        `Lenguajes: ${module.languages.map((language) => language.label).join(', ')}.`,
        `Temas disponibles:\n${activeChat.items.map((lesson) => {
          const explanation = module.languages
            .map(({ key, label }) => lesson[key] ? `${label}: ${lesson[key]}` : null)
            .filter(Boolean)
            .join('\n')
          return `${lesson.title}${explanation ? `\n${explanation}` : ''}`
        }).join('\n\n')}`,
      ].join('\n\n')

      fetch(LEARN_CHAT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, context: lessonContext }),
      })
        .then(async (response) => {
          if (!response.ok) {
            const data = await response.json().catch(() => ({}))
            throw new Error(data.error || 'El asistente no pudo responder.')
          }
          // El servidor envía el texto a medida que el modelo lo escribe
          const reader = response.body.getReader()
          const decoder = new TextDecoder()
          const update = (content, streaming) => setHistory((current) => ({
            ...current,
            [activeChat.id]: current[activeChat.id].map((entry) => (
              entry.id === reply.id ? { id: reply.id, kind: 'ai', content, streaming } : entry
            )),
          }))
          let content = ''
          for (;;) {
            const { done, value } = await reader.read()
            if (done) break
            content += decoder.decode(value, { stream: true })
            if (content.trim()) update(content, true)
          }
          content += decoder.decode()
          if (!content.trim()) throw new Error('El asistente devolvió una respuesta vacía.')
          update(content, false)
        })
        .catch((error) => {
          console.error('No se pudo obtener una respuesta del tutor IA:', error)
          setHistory((current) => ({
            ...current,
            [activeChat.id]: current[activeChat.id].map((entry) => (
              entry.id === reply.id
                ? { id: reply.id, kind: 'ai-error', content: error.message }
                : entry
            )),
          }))
        })
    }
    return reply.id
  }

  return (
    <div className={isChatOpen ? 'wa wa-chat-open' : 'wa'}>
      <aside className="wa-sidebar" aria-label="Temas">
        <div className="wa-sidebar-header">
          <div className="wa-heading">
            <h1>Aprende a programar</h1>
            <div className="wa-heading-actions">
              <a className="learn-back" href="#inicio">← Volver</a>
              <button className="icon-button" type="button" onClick={onToggleTheme} aria-label={`Activar tema ${theme === 'dark' ? 'claro' : 'oscuro'}`}>
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              </button>
            </div>
          </div>
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
            const completed = chat.type === 'final-exam' ? finalExamPassed : chat.index !== undefined && passedLevels[chat.index]
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
                      {completed
                          ? <span className="wa-chat-item-done" aria-label="Aprobado">✓✓</span>
                          : chat.type === 'final-exam'
                            ? <span className="wa-chat-item-count">10</span>
                            : pending > 0
                        ? <span className="wa-chat-item-count" aria-label={`${pending} temas por ver`}>{pending}</span>
                        : <span className="wa-chat-item-done" aria-label="Temas revisados">✓✓</span>}
                    </span>
                    <span className="wa-chat-item-preview">
                      {chat.type === 'final-exam'
                        ? 'Aprueba con 70% para completar el módulo'
                        : chat.preview}
                    </span>
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
        activeExam={activeExam}
        isLevelPassed={activeChat.index !== undefined && passedLevels[activeChat.index]}
        finalExamPassed={finalExamPassed}
        nextLevel={chats.find((chat) => chat.index === activeChat.index + 1)}
        onSend={send}
        onOpenChat={openChat}
        onStartExam={() => startExam(activeChat)}
        onPassExam={markExamPassed}
        onBack={() => setIsChatOpen(false)}
      />
    </div>
  )
}

function Conversation({
  module,
  chat,
  entries,
  askedTitles,
  activeExam,
  isLevelPassed,
  finalExamPassed,
  nextLevel,
  onSend,
  onOpenChat,
  onStartExam,
  onPassExam,
  onBack,
}) {
  const [draft, setDraft] = useState('')
  const [typingId, setTypingId] = useState(null)
  const [practiceId, setPracticeId] = useState(null)
  const messagesRef = useRef(null)
  const inputRef = useRef(null)
  const timeoutRef = useRef(null)
  const isComparison = chat.id === COMPARISON_ID

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const lastContent = entries[entries.length - 1]?.content

  useEffect(() => {
    const list = messagesRef.current
    if (list) list.scrollTo({ top: list.scrollHeight, behavior: 'smooth' })
  }, [activeExam, entries.length, typingId, lastContent])

  const remaining = chat.items.filter((item) => !askedTitles.has(item.title))
  const filter = normalize(draft)
  const suggestions = filter ? remaining.filter((item) => normalize(item.title).includes(filter)) : remaining
  const finalExam = chat.id === FINAL_EXAM_ID

  const lastEntry = entries[entries.length - 1]
  const isWaiting = Boolean(typingId) || lastEntry?.kind === 'ai-pending' || Boolean(lastEntry?.streaming)

  const ask = (text, options) => {
    if (!text.trim() || isWaiting) return
    // Conserva la sangría de la primera línea del código pegado
    const replyId = onSend(text.replace(/^\s*\n|\s+$/g, ''), options)
    setTypingId(replyId)
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setTypingId(null), TYPING_DELAY_MS)
  }

  const submit = (event) => {
    event.preventDefault()
    if (!draft.trim() || isWaiting) return
    ask(draft)
    setDraft('')
  }

  // Enter envía; Shift + Enter agrega una línea para poder escribir o pegar código
  const onDraftKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) submit(event)
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
                ? `¡Hola! Elige un criterio de abajo o pregúntame lo que quieras: te cuento cómo se comparan ${module.comparison.languages.join(', ')}.`
                : `¡Hola! Elige un tema de abajo para ver la lección con ejemplos en ${module.languages.map((language) => language.label).join(', ')}, o escribe tu pregunta o pega tu código: el tutor IA te guía con pistas y retos para que lo resuelvas tú, en lugar de darte la respuesta hecha.`}
            </p>
          </div>
        </div>

        {entries.map((entry, index) => {
          if (entry.kind === 'question') {
            const reply = entries[index + 1]
            return (
              <div className="wa-thread" key={entry.id}>
                <OutgoingBubble>
                  {entry.text.includes('\n') ? <code className="wa-out-code">{entry.text}</code> : entry.text}
                </OutgoingBubble>
                {reply && reply.id === typingId && <TypingBubble />}
                {reply && reply.id !== typingId && practiceId !== reply.id && (
                  <Reply entry={reply} chat={chat} module={module} onOpenChat={onOpenChat} />
                )}
                {reply && practiceId === reply.id && (
                  <PracticeCard
                    item={chat.items.find((item) => item.title === reply.title)}
                    module={module}
                    onExit={() => setPracticeId(null)}
                  />
                )}
                {reply === lastEntry && reply.kind === 'answer' && reply.id !== typingId && practiceId !== reply.id && !activeExam
                  && chat.items.find((item) => item.title === reply.title)?.code && (
                  <div className="wa-practice">
                    <span>Lee el código con calma y ejecútalo. Cuando lo tengas claro, ocúltalo y escríbelo tú de memoria.</span>
                    <button type="button" className="wa-suggestion wa-suggestion-next" onClick={() => setPracticeId(reply.id)}>
                      Ya lo revisé: escribirlo de memoria
                    </button>
                  </div>
                )}
                {reply === lastEntry && reply.kind === 'ai' && !isWaiting && !activeExam && (
                  <div className="wa-ai-actions" aria-label="Acciones del tutor">
                    {TUTOR_ACTIONS.map((action) => (
                      <button key={action.label} type="button" className="wa-suggestion" onClick={() => ask(action.text, { forceAi: true })}>
                        {action.label}
                      </button>
                    ))}
                    {reply.content.includes('```') && CONVERT_LANGUAGES.map((language) => (
                      <button
                        key={language}
                        type="button"
                        className="wa-suggestion wa-suggestion-convert"
                        onClick={() => ask(`Ahora quiero pasar este mismo algoritmo a ${language}.`, { forceAi: true })}
                      >
                        Pasar a {language}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          }
          return null
        })}
        {activeExam?.loading && (
          <div className="wa-exam wa-exam-loading" role="status">
            <span className="wa-typing" aria-hidden="true"><span /><span /><span /></span>
            {activeExam.interview
              ? 'La IA está preparando preguntas nuevas para tu entrevista de Angular…'
              : 'El tutor IA está preparando un examen nuevo para este nivel…'}
          </div>
        )}
        {activeExam && !activeExam.loading && (
          <ExamCard
            key={activeExam.id}
            exam={activeExam}
            nextLevel={nextLevel}
            onPass={onPassExam}
            onOpenChat={onOpenChat}
            onRetry={onStartExam}
          />
        )}
      </div>

      <footer className="wa-composer">
        {activeExam ? (
          <span className="wa-exam-hint">Responde todas las preguntas y alcanza al menos el 70% para aprobar.</span>
        ) : (
          <>
            <div className="wa-suggestions" aria-label="Sugerencias">
              {suggestions.map((item) => (
                <button key={item.title} type="button" className="wa-suggestion" onClick={() => selectSuggestion(item.title)}>
                  {item.title}
                </button>
              ))}
              {remaining.length === 0 && chat.index !== undefined && !isLevelPassed && (
                <button type="button" className="wa-suggestion wa-suggestion-exam" onClick={onStartExam}>
                  {chat.interview ? 'Simulacro de entrevista Angular · 70% para aprobar' : 'Examen del nivel · 70% para aprobar'}
                </button>
              )}
              {remaining.length === 0 && chat.index !== undefined && isLevelPassed && nextLevel && (
                <button type="button" className="wa-suggestion wa-suggestion-next" onClick={() => onOpenChat(nextLevel.id)}>
                  Siguiente nivel: {nextLevel.name} →
                </button>
              )}
              {remaining.length === 0 && chat.index !== undefined && isLevelPassed && !nextLevel && (
                <button type="button" className="wa-suggestion wa-suggestion-next" onClick={() => onOpenChat(FINAL_EXAM_ID)}>
                  Ir al examen final →
                </button>
              )}
              {remaining.length === 0 && finalExam && finalExamPassed && (
                <span className="wa-suggestion-done">¡Completaste el módulo de {module.label}!</span>
              )}
            </div>
            {!finalExam && (
              <form className="wa-composer-form" onSubmit={submit}>
                <textarea
                  ref={inputRef}
                  className="wa-composer-field"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={onDraftKeyDown}
                  rows={Math.min(COMPOSER_MAX_ROWS, draft.split('\n').length)}
                  spellCheck={false}
                  placeholder={isComparison ? 'Elige un criterio o pregunta lo que quieras' : 'Elige un tema, pregunta o pega tu código'}
                  aria-label="Escribe tu consulta. Shift + Enter para una línea nueva"
                />
                <button className="wa-composer-send" type="submit" disabled={!draft.trim() || isWaiting} aria-label="Enviar">
                  <SendIcon />
                </button>
              </form>
            )}
          </>
        )}
      </footer>
    </section>
  )
}

function ExamCard({ exam, nextLevel, onPass, onOpenChat, onRetry }) {
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)
  const required = Math.ceil(exam.questions.length * EXAM_PASS_RATE)
  const nextChatId = exam.kind === 'final' ? null : nextLevel?.id ?? FINAL_EXAM_ID
  const continueLabel = exam.kind === 'final'
    ? 'Examen final aprobado'
    : exam.interview
      ? 'Ir al examen final del módulo'
    : nextLevel ? `Continuar al ${nextLevel.name}` : 'Ir al examen final'

  const submit = (event) => {
    event.preventDefault()
    if (Object.keys(answers).length !== exam.questions.length || result) return
    const score = exam.questions.reduce((total, question) => (
      total + (answers[question.id] === question.answer ? 1 : 0)
    ), 0)
    const hasPassed = score >= required
    setResult({ score, hasPassed })
    if (hasPassed) onPass(exam)
  }

  return (
    <form className="wa-exam" onSubmit={submit}>
      <div className="wa-exam-heading">
        <strong>
          {exam.interview
            ? 'Simulacro de entrevista Angular'
            : exam.kind === 'final' ? 'Examen final' : 'Examen del nivel'}
        </strong>
        <span>
          {exam.questions.length} preguntas · necesitas {required} aciertos (70%)
          {exam.source === 'local' && ' · sin conexión con el tutor IA: preguntas de respaldo'}
        </span>
      </div>
      {exam.questions.map((question, index) => (
        <fieldset className="wa-exam-question" key={question.id} disabled={Boolean(result)}>
          <legend>
            {index + 1}. {question.prompt}
          </legend>
          {question.material && <p className="wa-exam-material">{question.material}</p>}
          <div className="wa-exam-options">
            {question.options.map((option) => (
              <label className="wa-exam-option" key={option}>
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={answers[question.id] === option}
                  onChange={() => setAnswers((current) => ({ ...current, [question.id]: option }))}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          {result && (
            <p className={answers[question.id] === question.answer ? 'wa-exam-feedback is-right' : 'wa-exam-feedback is-wrong'}>
              {answers[question.id] === question.answer ? 'Correcto. ' : `Incorrecto. Respuesta: ${question.answer}. `}
              {question.explanation}
            </p>
          )}
        </fieldset>
      ))}
      {result && (
        <p className={result.hasPassed ? 'wa-exam-result is-passed' : 'wa-exam-result is-failed'} role="status">
          {result.hasPassed
            ? exam.kind === 'final'
              ? `¡Aprobado! Obtuviste ${result.score} de ${exam.questions.length}. Completaste el módulo.`
              : exam.interview
                ? `¡Entrevista aprobada! Obtuviste ${result.score} de ${exam.questions.length}.`
              : `¡Aprobado! Obtuviste ${result.score} de ${exam.questions.length}. Ya puedes continuar con el siguiente nivel.`
            : `Obtuviste ${result.score} de ${exam.questions.length}. Necesitas ${required} para aprobar. Revisa las explicaciones e inténtalo con un examen nuevo.`}
        </p>
      )}
      <div className="wa-exam-actions">
        {result?.hasPassed && exam.kind === 'level' && (
          <button className="wa-exam-submit" type="button" onClick={() => onOpenChat(nextChatId)}>
            {continueLabel} →
          </button>
        )}
        {result?.hasPassed && exam.kind === 'final' && (
          <span className="wa-suggestion-done">Módulo completado ✓</span>
        )}
        {result?.hasPassed === false && (
          <button className="wa-exam-submit" type="button" onClick={onRetry}>
            Intentar con un examen nuevo
          </button>
        )}
        {!result && (
          <button className="wa-exam-submit" type="submit" disabled={Object.keys(answers).length !== exam.questions.length}>
            Entregar examen
          </button>
        )}
      </div>
    </form>
  )
}

const cleanOutput = (text = '') => text.split(/\r?\n/).map((line) => line.trimEnd()).join('\n').trim()
const squash = (line) => line.replace(/\s+/g, '')

// Práctica sin IA: la lección se oculta y el estudiante la reescribe de memoria.
// Se comprueba ejecutando su código en el navegador y comparándolo con el original.
function PracticeCard({ item, module, onExit }) {
  const languages = module.languages.filter(({ key }) => typeof item[key] === 'string')
  const [languageKey, setLanguageKey] = useState(languages[0].key)
  const [drafts, setDrafts] = useState({})
  const [status, setStatus] = useState('idle')
  const [result, setResult] = useState(null)
  const [revealed, setRevealed] = useState(false)

  const language = languages.find(({ key }) => key === languageKey)
  const senderClass = `wa-sender-${module.languages.indexOf(language)}`
  const value = drafts[languageKey] ?? ''
  const expected = item.output?.[languageKey]
  const runnable = canRun(languageKey) && !item.fixed?.includes(languageKey)
  const isBusy = status === 'loading' || status === 'running'

  const originalLines = item[languageKey].split('\n')
  const written = new Set(value.split('\n').map(squash))
  const isRecalled = (line) => written.has(squash(line))
  const codeLines = originalLines.filter((line) => line.trim())
  const recalled = codeLines.filter(isRecalled).length
  const hasVerdict = result && !result.error && typeof expected === 'string'
  const outputMatches = hasVerdict && cleanOutput(result.stdout) === cleanOutput(expected)

  const selectLanguage = (key) => {
    setLanguageKey(key)
    setResult(null)
    setRevealed(false)
    setStatus('idle')
  }

  const run = async () => {
    setStatus('running')
    const response = await runCode(languageKey, {
      code: value,
      stdin: item.stdin,
      setup: item.setup?.[languageKey],
      files: item.files?.[languageKey],
      mainFile: item.mainFile,
      driver: item.driver,
      middleware: item.middleware,
    }, setStatus)
    setResult(response)
    setStatus('done')
  }

  const onKeyDown = (event) => {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey) && runnable && !isBusy && value.trim()) {
      event.preventDefault()
      run()
    }
  }

  return (
    <>
      <div className="wa-bubble wa-bubble-in wa-bubble-code">
        <span className="wa-sender wa-sender-juan">Práctica de memoria · {item.title}</span>
        <p className="wa-practice-text">
          {item.prompt ?? 'La lección está oculta. Escribe el código tal como lo recuerdas; no tiene que quedar idéntico, tiene que funcionar.'}
        </p>
        {languages.length > 1 && (
          <div className="wa-practice-tabs" role="tablist" aria-label="Lenguaje de la práctica">
            {languages.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={key === languageKey}
                className={key === languageKey ? 'wa-suggestion is-active' : 'wa-suggestion'}
                onClick={() => selectLanguage(key)}
                disabled={isBusy}
              >
                {label}
              </button>
            ))}
          </div>
        )}
        {typeof expected === 'string' && expected.trim() && (
          <div className="wa-file">
            <span className="wa-file-name">Tu programa debe mostrar</span>
            <pre className="wa-code"><code>{expected.replace(/\n+$/, '')}</code></pre>
          </div>
        )}
        <textarea
          className="wa-code wa-editor wa-practice-editor"
          value={value}
          onChange={(event) => setDrafts((current) => ({ ...current, [languageKey]: event.target.value }))}
          onKeyDown={onKeyDown}
          rows={Math.max(4, value.split('\n').length)}
          wrap="off"
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          placeholder={`Escribe aquí tu código en ${language.label}`}
          aria-label={`Tu código en ${language.label}${runnable ? '. Ctrl + Enter para ejecutar' : ''}`}
        />
        {!runnable && <span className="wa-output-note">{language.label} no se puede ejecutar en el navegador: compara tu código con el original.</span>}
        <div className="wa-practice-actions">
          <button className="wa-run" type="button" onClick={onExit}>← Volver a la lección</button>
          <button className="wa-run" type="button" onClick={() => setRevealed(true)} disabled={!value.trim() || revealed}>
            Comparar con el original
          </button>
          {runnable && (
            <button className="wa-run" type="button" onClick={run} disabled={isBusy || !value.trim()}>
              <PlayIcon /> {status === 'done' ? 'Ejecutar de nuevo' : 'Ejecutar'}
            </button>
          )}
        </div>
      </div>

      <div className="wa-live" aria-live="polite">
        {isBusy && (
          <div className="wa-bubble wa-bubble-in wa-typing-wrap" role="status">
            <span className="wa-typing" aria-hidden="true"><span /><span /><span /></span>
            <span className="wa-typing-text">
              {status === 'loading' ? loadingMessage(languageKey) : `${language.label} está escribiendo…`}
            </span>
          </div>
        )}
        {status === 'done' && result && (
          <RunResult result={result} language={languageKey} sender={language.label} senderClass={senderClass} outputLabel={module.outputLabel} />
        )}
        {status === 'done' && hasVerdict && (
          <p className={outputMatches ? 'wa-exam-feedback is-right' : 'wa-exam-feedback is-wrong'}>
            {outputMatches
              ? '¡Correcto! Tu programa muestra lo mismo que el de la lección.'
              : 'Tu salida todavía no coincide con la esperada. Compárala línea por línea y vuelve a intentarlo.'}
          </p>
        )}
        {revealed && (
          <div className="wa-bubble wa-bubble-in wa-bubble-code">
            <span className={`wa-sender ${senderClass}`}>{language.label} · código original</span>
            <span className="wa-output-note">
              Recordaste {recalled} de {codeLines.length} líneas tal cual. Las resaltadas son las que escribiste distinto o te faltaron; si tu programa funciona, distinto no significa mal.
            </span>
            <pre className="wa-code">
              <code>
                {originalLines.map((line, index) => (
                  <span key={index} className={line.trim() && !isRecalled(line) ? 'wa-practice-miss' : undefined}>{line}{'\n'}</span>
                ))}
              </code>
            </pre>
          </div>
        )}
      </div>
    </>
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

function JuanBubble({ children, copyText }) {
  return (
    <div className="wa-bubble wa-bubble-in">
      <span className="wa-code-header">
        <span className="wa-sender wa-sender-juan">Juan de la Cruz</span>
        {copyText && <CopyButton text={copyText} />}
      </span>
      {children}
    </div>
  )
}

function Reply({ entry, chat, module, onOpenChat }) {
  if (entry.kind === 'ai-pending') return <TypingBubble />

  if (entry.kind === 'ai' || entry.kind === 'ai-error') {
    return (
      <div className="wa-bubble wa-bubble-in wa-ai-reply" role={entry.kind === 'ai-error' ? 'alert' : undefined}>
        <span className="wa-code-header">
          <span className="wa-sender wa-sender-juan">{entry.kind === 'ai-error' ? 'Asistente de aprendizaje · error' : 'Tutor IA'}</span>
          {entry.kind === 'ai' && !entry.streaming && <CopyButton text={entry.content} />}
        </span>
        {entry.kind === 'ai' ? <AiContent text={entry.content} /> : <p>{entry.content}</p>}
        {entry.streaming && <span className="wa-caret" aria-hidden="true" />}
        {entry.kind === 'ai-error' && <span className="wa-output-note">Comprueba que el servidor esté activo y que tenga configurada GROQ_API_KEY.</span>}
      </div>
    )
  }

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
      <JuanBubble copyText={item.values.map((value, index) => `${languages[index]}: ${value}`).join('\n')}>
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
        <JuanBubble copyText={item.prompt}>
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
          <span className="wa-code-header">
            <span className={`wa-sender wa-sender-${index}`}>{label}</span>
            <CopyButton text={item[key]} />
          </span>
          <pre className="wa-code wa-session"><code>{item[key]}</code></pre>
          {item.note && <span className="wa-output-note">{item.note}</span>}
        </div>
      ) : (
        <div className="wa-bubble wa-bubble-in">
          <span className="wa-code-header">
            <span className={`wa-sender wa-sender-${index}`}>{label}</span>
            <CopyButton text={item[key]} />
          </span>
          <p className="wa-text"><Linkify text={item[key]} /></p>
        </div>
      )}
        </div>
      ))}
    </>
  )
}

// Muestra la respuesta del tutor: bloques ``` como código, `comandos` y **negritas**
function AiContent({ text }) {
  return text.split(/```[\w+#-]*\n?([\s\S]*?)(?:```|$)/g).map((part, index) => {
    if (!part.trim()) return null
    if (index % 2 === 1) return <pre className="wa-code" key={index}><code>{part.replace(/\n+$/, '')}</code></pre>
    return (
      <p key={index}>
        {part.trim().split(/(`[^`\n]+`|\*\*[^*\n]+\*\*)/g).map((piece, pieceIndex) => {
          if (/^`[^`\n]+`$/.test(piece)) return <code className="wa-inline-code" key={pieceIndex}>{piece.slice(1, -1)}</code>
          if (/^\*\*[^*\n]+\*\*$/.test(piece)) return <strong key={pieceIndex}>{piece.slice(2, -2)}</strong>
          return piece
        })}
      </p>
    )
  })
}

// Convierte las direcciones web del texto en enlaces
function Linkify({ text }) {
  return text.split(/(https?:\/\/[^\s]+)/g).map((part, index) => (
    /^https?:\/\//.test(part)
      ? <a key={index} href={part} target="_blank" rel="noreferrer">{part.replace(/^https?:\/\//, '')}</a>
      : part
  ))
}
