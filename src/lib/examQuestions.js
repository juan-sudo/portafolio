const BLANK = '_____'
const MAX_MATERIAL = 500
const MAX_CODE_LINES = 14

// Palabras reservadas y funciones básicas que se pueden ocultar en un fragmento de código
const CODE_KEYWORDS = new Set([
  'if', 'elif', 'else', 'for', 'while', 'def', 'return', 'class', 'import', 'from', 'try', 'except', 'finally',
  'with', 'lambda', 'in', 'not', 'break', 'continue', 'pass', 'yield', 'raise', 'print', 'len', 'range', 'input',
  'function', 'echo', 'foreach', 'elseif', 'switch', 'case', 'new', 'extends', 'implements', 'catch', 'throw',
  'const', 'let', 'var', 'interface', 'abstract', 'static', 'async', 'await', 'typeof', 'instanceof', 'namespace',
  'use', 'require', 'include',
  'SELECT', 'FROM', 'WHERE', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'JOIN', 'ON', 'GROUP', 'BY',
  'ORDER', 'HAVING', 'LIMIT', 'CREATE', 'TABLE', 'ALTER', 'DROP', 'DISTINCT', 'AS',
])

// Palabras intercambiables entre sí: no sirven como alternativa incorrecta una de la otra
const INTERCHANGEABLE = [
  ['echo', 'print'],
  ['let', 'const', 'var'],
  ['break', 'continue'],
  ['require', 'include'],
  ['elif', 'elseif'],
  ['async', 'static'],
]

// Términos técnicos dentro de una explicación: quit(), UTF-8, sys.argv, pgAdmin…
const TERM_PATTERN = /[A-Za-z_][\w.]*\(\)|\b[A-Z][A-Z0-9]{2,}(?:-[A-Z0-9]+)*\b|\b[A-Za-z_]\w*\.[a-z_]\w+\b|\b[A-Za-z][a-z]+[A-Z]\w*\b/g

export function shuffle(items) {
  const shuffled = [...items]
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const other = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[other]] = [shuffled[other], shuffled[index]]
  }
  return shuffled
}

const truncate = (text, max = MAX_MATERIAL) => (
  text.length > max ? `${text.slice(0, max - 3).trimEnd()}...` : text
)

const termShape = (term) => {
  if (term.endsWith('()')) return 'call'
  if (term.includes('.')) return 'dotted'
  if (term === term.toUpperCase()) return 'caps'
  return 'camel'
}

const codeOf = (topic, key) => {
  const code = topic.examCode?.[key] ?? (topic.code ? topic[key] : null)
  return typeof code === 'string' && code.trim() ? code : null
}

const outputOf = (topic, key) => {
  const output = topic.expectedOutput?.[key] ?? topic.output?.[key]
  return typeof output === 'string' && output.trim() ? output.trim() : null
}

const textOf = (topic, key) => (
  !topic.code && !topic.session && typeof topic[key] === 'string' ? topic[key] : null
)

const isCommentLine = (line) => /^\s*(#|\/\/|--|\*|\/\*|<!--)/.test(line)

// Posiciones de las palabras reservadas que no están dentro de un comentario ni de una cadena
function keywordsIn(code) {
  const found = []
  code.split('\n').forEach((line, lineIndex) => {
    if (isCommentLine(line)) return
    for (const match of line.matchAll(/[A-Za-z_]\w*/g)) {
      if (!CODE_KEYWORDS.has(match[0]) || line[match.index - 1] === '.') continue
      const quotes = line.slice(0, match.index).match(/["'`]/g)?.length ?? 0
      if (quotes % 2 === 0) found.push({ word: match[0], lineIndex, column: match.index })
    }
  })
  return found
}

function codeWithBlank(code, { word, lineIndex, column }) {
  const lines = code.split('\n')
  lines[lineIndex] = `${lines[lineIndex].slice(0, column)}${BLANK}${lines[lineIndex].slice(column + word.length)}`
  if (lines.length <= MAX_CODE_LINES) return lines.join('\n')
  const start = Math.max(0, Math.min(lineIndex - Math.floor(MAX_CODE_LINES / 2), lines.length - MAX_CODE_LINES))
  const visible = lines.slice(start, start + MAX_CODE_LINES)
  if (start > 0) visible.unshift('...')
  if (start + MAX_CODE_LINES < lines.length) visible.push('...')
  return visible.join('\n')
}

function buildOutputQuestions(topics, module, allTopics) {
  const allOutputs = allTopics.flatMap((topic) => module.languages.flatMap(({ key }) => outputOf(topic, key) ?? []))
  return topics.flatMap((topic) => module.languages.flatMap(({ key }) => {
    const code = codeOf(topic, key)
    const answer = outputOf(topic, key)
    if (!code || !answer) return []
    const distractors = [...new Set([...allOutputs, 'No muestra nada', 'Error de sintaxis'])]
      .filter((output) => output !== answer)
      // Las alternativas más creíbles son las salidas de tamaño parecido a la correcta
      .sort((first, second) => Math.abs(first.length - answer.length) - Math.abs(second.length - answer.length))
      .slice(0, 8)
    return [{
      kind: 'output',
      topic,
      prompt: '¿Qué resultado produce este código?',
      material: truncate(code),
      answer,
      distractors,
    }]
  }))
}

function buildCodeClozeQuestions(topics, module, allTopics) {
  const multipleLanguages = module.languages.length > 1
  return topics.flatMap((topic) => module.languages.flatMap(({ key, label }) => {
    const code = codeOf(topic, key)
    if (!code) return []
    const keywords = keywordsIn(code)
    if (keywords.length === 0) return []

    // Se prefiere una palabra que aparezca una sola vez: las repetidas delatan la respuesta
    const unique = keywords.filter(({ word }) => keywords.filter((other) => other.word === word).length === 1)
    const target = shuffle(unique.length ? unique : keywords)[0]
    const group = INTERCHANGEABLE.find((words) => words.includes(target.word)) ?? []
    const isUpper = target.word === target.word.toUpperCase()
    const sameLanguage = allTopics.flatMap((other) => {
      const otherCode = codeOf(other, key)
      return otherCode ? keywordsIn(otherCode).map(({ word }) => word) : []
    })
    const sameStyle = [...CODE_KEYWORDS].filter((word) => (word === word.toUpperCase()) === isUpper)
    const distractors = [...new Set([...shuffle(sameLanguage), ...shuffle(sameStyle)])]
      .filter((word) => word !== target.word && !group.includes(word))

    const output = outputOf(topic, key)
    const blanked = codeWithBlank(code, target)
    return [{
      kind: 'cloze-code',
      topic,
      prompt: `Completa el código${multipleLanguages ? ` de ${label}` : ''}: ¿qué palabra va en el espacio en blanco?`,
      material: output ? `${blanked}\n\nResultado esperado:\n${truncate(output, 200)}` : blanked,
      answer: target.word,
      // Se priorizan las palabras que el estudiante ya vio en este lenguaje
      distractors: distractors.slice(0, 3),
      fixedDistractors: true,
    }]
  }))
}

function buildSentenceClozeQuestions(topics, module, allTopics) {
  const labels = module.languages.map(({ label }) => label.toLowerCase())
  const isTerm = (term) => !labels.includes(term.toLowerCase())
  const allTerms = [...new Set(allTopics.flatMap((topic) => module.languages.flatMap(({ key }) => (
    textOf(topic, key)?.replace(/https?:\/\/\S+/g, '').match(TERM_PATTERN) ?? []
  ))))].filter(isTerm)
  const multipleLanguages = module.languages.length > 1

  return topics.flatMap((topic) => module.languages.flatMap(({ key, label }) => {
    const text = textOf(topic, key)
    if (!text) return []
    const sentences = text
      .split(/(?<=[.!?;])\s+|\n/)
      .map((sentence) => sentence.trim())
      .filter((sentence) => sentence.length >= 25 && sentence.length <= 400 && !sentence.includes('http'))

    for (const sentence of shuffle(sentences)) {
      const terms = [...new Set(sentence.match(TERM_PATTERN) ?? [])].filter(isTerm)
      // Una oración con muchos términos es una enumeración: cualquier alternativa parecería válida
      if (terms.length === 0 || terms.length > 3) continue
      const answer = shuffle(terms)[0]
      const inSentence = terms.map((term) => term.toLowerCase())
      const candidates = shuffle(allTerms.filter((term) => !inSentence.includes(term.toLowerCase())))
      const distractors = [
        ...candidates.filter((term) => termShape(term) === termShape(answer)),
        ...candidates.filter((term) => termShape(term) !== termShape(answer)),
      ]
      return [{
        kind: 'cloze-text',
        topic,
        prompt: `Completa la oración${multipleLanguages ? ` sobre ${label}` : ''} con el término correcto:`,
        material: sentence.split(answer).join(BLANK),
        answer,
        distractors: distractors.slice(0, 3),
        fixedDistractors: true,
      }]
    }
    return []
  }))
}

function buildTopicQuestions(topics, module, allTopics) {
  const titles = [...new Set(allTopics.map((topic) => topic.title))]
  return topics.map((topic) => ({
    kind: 'topic',
    topic,
    prompt: '¿A qué tema corresponde este material?',
    material: truncate(
      topic.prompt
        ?? topic.note
        ?? module.languages.map(({ key }) => topic[key]).find((value) => typeof value === 'string' && value.trim())
        ?? topic.title,
    ),
    answer: topic.title,
    distractors: titles.filter((title) => title !== topic.title),
  }))
}

// Arma el examen alternando preguntas de resultado, de completar código y de completar oraciones.
// Las de «¿a qué tema corresponde?» solo se usan si el nivel no da para más preguntas técnicas.
export function buildExamQuestions(topics, module, count) {
  const allTopics = module.levels.flatMap((level) => level.topics)
  const pools = [buildOutputQuestions, buildCodeClozeQuestions, buildSentenceClozeQuestions]
    .map((build) => shuffle(build(topics, module, allTopics).filter((question) => question.distractors.length >= 3)))
  const selected = []
  const isRepeated = [
    (question) => selected.some((other) => other.topic === question.topic),
    (question) => selected.some((other) => other.topic === question.topic && other.kind === question.kind),
    (question) => selected.some((other) => other.material === question.material),
  ]

  // Cada pasada es menos estricta: primero un tema por pregunta, luego se permite repetir tema
  isRepeated.forEach((repeated) => {
    let added = true
    while (selected.length < count && added) {
      added = false
      pools.forEach((pool) => {
        if (selected.length >= count) return
        const index = pool.findIndex((question) => !repeated(question))
        if (index === -1) return
        selected.push(...pool.splice(index, 1))
        added = true
      })
    }
  })

  if (selected.length < count) {
    const fallback = shuffle(buildTopicQuestions(topics, module, allTopics))
      .filter((question) => question.distractors.length >= 3)
    selected.push(...fallback.slice(0, count - selected.length))
  }

  return shuffle(selected).map((question, index) => {
    const distractors = question.fixedDistractors ? question.distractors : shuffle(question.distractors).slice(0, 3)
    return {
      id: `${question.kind}-${index}-${question.topic.title}`,
      kind: question.kind,
      prompt: question.prompt,
      material: question.material,
      options: shuffle([question.answer, ...distractors]),
      answer: question.answer,
    }
  })
}
