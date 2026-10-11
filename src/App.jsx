import { useEffect, useState } from 'react'
import { useTheme } from './hooks/useTheme'
import { Header } from './components/layout/Header'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Experience } from './components/sections/Experience'
import { Skills } from './components/sections/Skills'
import { Projects } from './components/sections/Projects'
import { Contact } from './components/sections/Contact'
import { Footer } from './components/layout/Footer'
import { ChatWidget } from './components/ui/ChatWidget'
import { LearnPage } from './pages/LearnPage'
import { getLearnModule, isLearnRoute } from './data/learn'
import './App.css'

function useHash() {
  const [hash, setHash] = useState(window.location.hash)

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return hash
}

function App() {
  const { theme, toggleTheme } = useTheme()
  const hash = useHash()
  const isLearnPage = isLearnRoute(hash)

  useEffect(() => {
    if (isLearnPage) window.scrollTo(0, 0)
  }, [isLearnPage])

  useEffect(() => {
    // Al volver desde otra página, la sección aún no existía cuando cambió el hash
    if (!isLearnPage && hash) document.querySelector(hash)?.scrollIntoView()
  }, [isLearnPage, hash])

  if (isLearnPage) {
    return (
      <div className="app">
        <a
          className="skip-link"
          href="#contenido"
          onClick={(event) => {
            // El hash define la página: no lo cambiamos para no salir de "Aprende"
            event.preventDefault()
            document.getElementById('contenido')?.focus()
          }}
        >
          Saltar al contenido
        </a>
        <LearnPage module={getLearnModule(hash)} theme={theme} onToggleTheme={toggleTheme} />
      </div>
    )
  }

  return (
    <div className="app">
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main id="contenido">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}

export default App
