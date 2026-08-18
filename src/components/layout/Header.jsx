import { useState } from 'react'
import { navigation } from '../../data/portfolio'
import { MenuIcon, MoonIcon, SunIcon } from '../ui/Icons'

export function Header({ theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#inicio" aria-label="Ir al inicio">
          <span>J</span> Juan de la Cruz
        </a>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Navegación principal">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
          ))}
        </nav>
        <div className="header-actions">
          <button className="icon-button" type="button" onClick={onToggleTheme} aria-label={`Activar tema ${theme === 'dark' ? 'claro' : 'oscuro'}`}>
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <button className="icon-button menu-button" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label="Abrir menú">
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>
    </header>
  )
}
