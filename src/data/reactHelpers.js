const DOCS = 'https://react.dev'

// Lección de texto, lección con código y lista de páginas de la documentación oficial
export const text = (title, react, note) => ({ title, react, ...(note && { note }) })
export const code = (title, react, note) => ({ title, code: true, react, ...(note && { note }) })
export const links = (title, entries) => ({
  title,
  react: entries.map(([label, path]) => `${label}: ${DOCS}/${path}`).join('\n'),
})
