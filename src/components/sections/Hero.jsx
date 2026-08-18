import portrait from '../../assets/mio.jpg'
import { profile } from '../../data/portfolio'
import { ArrowIcon } from '../ui/Icons'

export function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="status"><i /> Disponible para nuevos proyectos</span>
          <p className="hero-kicker">Hola, soy Juan.</p>
          <h1>Desarrollor <em>full stack.</em></h1>
          <p className="hero-description">{profile.description}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#proyectos">Ver proyectos <ArrowIcon /></a>
            <a className="button button-secondary" href={profile.cv} target="_blank" rel="noreferrer">Descargar CV</a>
          </div>
          <div className="social-links" aria-label="Redes sociales">
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={profile.facebook} target="_blank" rel="noreferrer">Facebook</a>
          </div>
        </div>
        <div className="portrait-wrap" aria-hidden="true">
          <div className="portrait-accent" />
          <img src={portrait} alt="" />
          <div className="portrait-badge"><strong>Full Stack</strong><span>Frontend + Backend</span></div>
        </div>
      </div>
    </section>
  )
}
