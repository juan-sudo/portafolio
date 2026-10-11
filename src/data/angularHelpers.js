const DOCS = 'https://v17.angular.io'

// Lección de texto, lección con código y lista de guías de la documentación oficial
export const text = (title, angular, note) => ({ title, angular, ...(note && { note }) })
export const code = (title, angular, note) => ({ title, code: true, angular, ...(note && { note }) })
export const links = (title, entries) => ({
  title,
  angular: entries.map(([label, path]) => `${label}: ${DOCS}/${path}`).join('\n'),
})
