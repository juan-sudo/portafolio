import { LearnChat } from '../components/learn/LearnChat'
import { MoonIcon, SunIcon } from '../components/ui/Icons'

export function LearnPage({ module, theme, onToggleTheme }) {
  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#inicio" aria-label="Volver al portafolio">
            <span>J</span> Juan de la Cruz
          </a>
          <div className="header-actions">
            <a className="learn-back" href="#inicio">← Volver al portafolio</a>
            <button className="icon-button" type="button" onClick={onToggleTheme} aria-label={`Activar tema ${theme === 'dark' ? 'claro' : 'oscuro'}`}>
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>
      </header>
      <main id="contenido" className="learn-page" tabIndex={-1}>
        <LearnChat key={module.id} module={module} />
      </main>
    </>
  )
}
