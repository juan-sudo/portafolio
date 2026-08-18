import { profile } from '../../data/portfolio'
import { ArrowIcon } from '../ui/Icons'

export function Contact() {
  return (
    <section className="contact-section" id="contacto">
      <div className="container contact-inner">
        <span className="eyebrow">05 / Contacto</span>
        <h2>¿Tienes una idea?<br />Construyámosla juntos.</h2>
        <p>Estoy abierto a conversar sobre nuevos proyectos, colaboraciones y oportunidades profesionales.</p>
        <a className="button button-light" href={profile.linkedin} target="_blank" rel="noreferrer">Conversemos en LinkedIn <ArrowIcon /></a>
      </div>
    </section>
  )
}
