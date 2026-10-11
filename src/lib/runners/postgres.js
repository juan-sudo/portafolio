// Ejecuta SQL en un PostgreSQL real compilado a WebAssembly (PGlite), dentro de la página
const PGLITE_URL = 'https://cdn.jsdelivr.net/npm/@electric-sql/pglite@0.5.8/dist/index.js'
const NUMERIC_TYPES = new Set([20, 21, 23, 700, 701, 1700])

let dbPromise = null
let queue = Promise.resolve()

const getDatabase = () => {
  dbPromise ??= import(/* @vite-ignore */ PGLITE_URL)
    .then(({ PGlite }) => PGlite.create())
    .catch((error) => {
      dbPromise = null
      throw error
    })
  return dbPromise
}

// Deja la base vacía antes de cada ejecución
async function reset(db) {
  await db.exec('ROLLBACK').catch(() => {})
  const { rows } = await db.query("SELECT datname FROM pg_database WHERE datname NOT IN ('postgres', 'template0', 'template1')")
  for (const { datname } of rows) await db.exec(`DROP DATABASE IF EXISTS "${datname}"`)
  await db.exec('DROP SCHEMA public CASCADE; CREATE SCHEMA public;')
}

// Separa las sentencias por ";" respetando los textos entre comillas
function splitStatements(sql) {
  const statements = []
  let current = ''
  let quoted = false
  for (const char of sql) {
    if (char === "'") quoted = !quoted
    if (char === ';' && !quoted) {
      if (current.trim()) statements.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  if (current.trim()) statements.push(current.trim())
  return statements
}

function formatValue(value) {
  if (value === null || value === undefined) return ''
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  if (Array.isArray(value)) return `{${value.map(formatValue).join(',')}}`
  if (typeof value === 'object') return JSON.stringify(value)
  return String(value)
}

// Imita el formato de tabla de psql
function formatTable({ fields, rows }) {
  const names = fields.map((field) => field.name)
  const cells = rows.map((row) => names.map((name) => formatValue(row[name])))
  const widths = names.map((name, index) => Math.max(name.length, ...cells.map((row) => row[index].length)))
  const center = (text, width) => {
    const left = Math.floor((width - text.length) / 2)
    return ' '.repeat(left) + text + ' '.repeat(width - text.length - left)
  }
  const header = names.map((name, index) => ` ${center(name, widths[index])} `).join('|')
  const divider = widths.map((width) => '-'.repeat(width + 2)).join('+')
  const body = cells.map((row) => row
    .map((cell, index) => (NUMERIC_TYPES.has(fields[index].dataTypeID) ? ` ${cell.padStart(widths[index])} ` : ` ${cell.padEnd(widths[index])} `))
    .join('|')
    .replace(/\s+$/, ''))
  const count = `(${rows.length} ${rows.length === 1 ? 'row' : 'rows'})`
  return [header.replace(/\s+$/, ''), divider, ...body, count].join('\n')
}

function commandTag(result, statement) {
  const words = statement.toUpperCase().split(/\s+/)
  const command = result.command ?? words[0]
  if (command === 'INSERT') return `INSERT 0 ${result.rowCount ?? 0}`
  if (['UPDATE', 'DELETE'].includes(command)) return `${command} ${result.rowCount ?? 0}`
  if (['CREATE', 'DROP', 'ALTER'].includes(command)) return `${command} ${words[1] ?? ''}`.trim()
  if (command === 'START') return 'START TRANSACTION'
  return command
}

// Las ejecuciones comparten la misma base, así que van una detrás de otra
export function runPostgres(request, onStatus) {
  const result = queue.then(() => execute(request, onStatus))
  queue = result.catch(() => {})
  return result
}

async function execute({ code, setup = '' }, onStatus) {
  if (!dbPromise) onStatus?.('loading')
  let db
  try {
    db = await getDatabase()
  } catch (error) {
    return { stdout: '', error: { type: 'LoadError', message: String(error?.message ?? error) } }
  }
  onStatus?.('running')
  await reset(db)
  if (setup) await db.exec(setup)

  // \c y otros comandos de psql no son SQL: se omiten, conservando las posiciones del texto
  const notes = []
  const sql = code.replace(/^[ \t]*\\.*$/gm, (line) => {
    notes.push(`${line.trim()} es un comando de la consola psql; aquí se omite.`)
    return ' '.repeat(line.length)
  })

  try {
    const results = await db.exec(sql)
    const statements = splitStatements(sql)
    const stdout = results
      .map((result, index) => (result.fields.length ? formatTable(result) : commandTag(result, statements[index] ?? '')))
      .join('\n\n')
    return { stdout, notes }
  } catch (error) {
    const position = Number(error.position)
    const line = position ? sql.slice(0, position - 1).split('\n').length : null
    return {
      stdout: '',
      notes,
      error: { type: error.code ?? 'Error', message: `ERROR:  ${error.message}`, line, hint: error.hint || null },
    }
  }
}
