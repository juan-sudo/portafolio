import level00 from './level00'
import level01 from './level01'
import level02 from './level02'
import level03 from './level03'
import level04 from './level04'
import level05 from './level05'
import level06 from './level06'
import level07 from './level07'
import level08 from './level08'
import level09 from './level09'
import level10 from './level10'
import level11 from './level11'
import level12 from './level12'
import level13 from './level13'
import level14 from './level14'
import level15 from './level15'
import level16 from './level16'

// Lecciones de los niveles clásicos en los demás lenguajes de backend, por posición del nivel y título
const EXTRA_BY_LEVEL = [
  level00, level01, level02, level03, level04, level05, level06, level07, level08, level09, level10, level11, level12, level13, level14, level15, level16,
]

const EXTRA_KEYS = ['javascript', 'go', 'csharp', 'ruby', 'rust', 'kotlin']

// Añade a cada lección de Python, PHP y Java su versión en los otros lenguajes.
// Si no se indica otra salida, la esperada es la misma que la de Java.
export function withExtraLanguages(levels) {
  return levels.map((level, index) => {
    const extras = EXTRA_BY_LEVEL[index]
    if (!extras) return level
    return {
      ...level,
      topics: level.topics.map((topic) => {
        const extra = extras[topic.title]
        if (!extra) return topic
        const { output, examCode, expectedOutput, files, jsFixed, ...snippets } = extra
        const merged = { ...topic, ...snippets }
        if (files) merged.files = { ...topic.files, ...files }
        if (topic.output) {
          const base = topic.output.java ?? topic.output.python
          merged.output = {
            ...topic.output,
            ...Object.fromEntries(EXTRA_KEYS.filter((key) => key in snippets).map((key) => [key, output?.[key] ?? base])),
          }
        }
        if (examCode) merged.examCode = { ...topic.examCode, ...examCode }
        if (expectedOutput) merged.expectedOutput = { ...topic.expectedOutput, ...expectedOutput }
        if (jsFixed) merged.fixed = [...(topic.fixed ?? []), 'javascript']
        return merged
      }),
    }
  })
}
