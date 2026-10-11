import { LearnChat } from '../components/learn/LearnChat'

export function LearnPage({ module, theme, onToggleTheme }) {
  return (
    <main id="contenido" className="learn-page" tabIndex={-1}>
      <LearnChat key={module.id} module={module} theme={theme} onToggleTheme={onToggleTheme} />
    </main>
  )
}
