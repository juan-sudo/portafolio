import { useTheme } from './hooks/useTheme'
import { Header } from './components/layout/Header'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Experience } from './components/sections/Experience'
import { Skills } from './components/sections/Skills'
import { Projects } from './components/sections/Projects'
import { Contact } from './components/sections/Contact'
import { Footer } from './components/layout/Footer'
import './App.css'

function App() {
  const { theme, toggleTheme } = useTheme()

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
    </div>
  )
}

export default App
