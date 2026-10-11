import { useEffect, useRef, useState } from 'react'
import { LEARN_ROUTE, learnModules } from '../../data/learn'
import { buildExamQuestions, shuffle } from '../../lib/examQuestions'
import { canRun } from '../../lib/runners'
import { MoonIcon, SendIcon, SunIcon } from '../ui/Icons'
import { CodeMessage } from './CodeMessage'

const COMPARISON_ID = 'vs'
const FINAL_EXAM_ID = 'examen-final'
const TYPING_DELAY_MS = 900
const EXAM_PASS_RATE = 0.7
const LEARN_CHAT_API_URL = import.meta.env.VITE_LEARN_CHAT_API_URL || 'http://localhost:8787/api/learn-chat'
const LEARN_EXAM_API_URL = import.meta.env.VITE_LEARN_EXAM_API_URL || LEARN_CHAT_API_URL.replace(/learn-chat$/, 'learn-exam')
const EXAM_TIMEOUT_MS = 45_000
const EXAM_CONTEXT_LIMIT = 8_000
const EXAM_SEEN_LIMIT = 20

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
  const send = (text) => {
    const item = findItem(text, activeChat.items)
    const question = { id: newEntryId(), kind: 'question', text: item ? item.title : text }
    const currentHistory = history[activeChat.id] ?? []
    let reply

    if (item) {
      reply = { id: newEntryId(), kind: 'answer', title: item.title }
    } else {
      const other = chats.find((chat) => chat.id !== activeChat.id && findItem(text, chat.items))
      reply = other
        ? { id: newEntryId(), kind: 'redirect', chatId: other.id, chatName: other.name, title: findItem(text, other.items).title }
        : { id: newEntryId(), kind: 'ai-pending' }
    }

    setHistory((current) => ({ ...current, [activeChat.id]: [...(current[activeChat.id] ?? []), question, reply] }))
    if (reply.kind === 'ai-pending') {
      const messages = currentHistory.flatMap((entry) => {
        if (entry.kind === 'question') return [{ role: 'user', content: entry.text }]
        if (entry.kind === 'ai') return [{ role: 'assistant', content: entry.content }]
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
          const data = await response.json()
          if (!response.ok) throw new Error(data.error || 'El asistente no pudo responder.')
          if (typeof data.reply !== 'string' || !data.reply.trim()) {
            throw new Error('El asistente devolvió una respuesta vacía.')
          }
          setHistory((current) => ({
            ...current,
            [activeChat.id]: current[activeChat.id].map((entry) => (
              entry.id === reply.id ? { id: reply.id, kind: 'ai', content: data.reply } : entry
            )),
          }))
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
  const messagesRef = useRef(null)
  const inputRef = useRef(null)
  const timeoutRef = useRef(null)
  const isComparison = chat.id === COMPARISON_ID

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  useEffect(() => {
    const list = messagesRef.current
    if (list) list.scrollTo({ top: list.scrollHeight, behavior: 'smooth' })
  }, [activeExam, entries.length, typingId])

  const remaining = chat.items.filter((item) => !askedTitles.has(item.title))
  const filter = normalize(draft)
  const suggestions = filter ? remaining.filter((item) => normalize(item.title).includes(filter)) : remaining
  const finalExam = chat.id === FINAL_EXAM_ID

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
                ? `¡Hola! Elige un criterio de abajo o pregúntame lo que quieras: te cuento cómo se comparan ${module.comparison.languages.join(', ')}.`
                : `¡Hola! Elige un tema de abajo para ver la lección con ejemplos en ${module.languages.map((language) => language.label).join(', ')}, o escribe cualquier pregunta y te la responde el tutor IA.`}
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
                <input
                  ref={inputRef}
                  className="wa-composer-field"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder={isComparison ? 'Elige un criterio o pregunta lo que quieras' : 'Elige un tema o pregunta lo que quieras'}
                  aria-label="Escribe tu consulta"
                />
                <button className="wa-composer-send" type="submit" disabled={!draft.trim() || Boolean(typingId)} aria-label="Enviar">
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
  if (entry.kind === 'ai-pending') return <TypingBubble />

  if (entry.kind === 'ai' || entry.kind === 'ai-error') {
    return (
      <div className="wa-bubble wa-bubble-in wa-ai-reply" role={entry.kind === 'ai-error' ? 'alert' : undefined}>
        <span className="wa-sender wa-sender-juan">{entry.kind === 'ai-error' ? 'Asistente de aprendizaje · error' : 'Tutor IA'}</span>
        {entry.kind === 'ai' ? <AiContent text={entry.content} /> : <p>{entry.content}</p>}
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
