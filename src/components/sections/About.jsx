import { SectionHeading } from '../ui/SectionHeading'

export function About() {
  return (
    <section className="section section-muted" id="sobre-mi">
      <div className="container about-grid">
        <SectionHeading eyebrow="01 / Sobre mí" title="Código limpio, experiencias claras." />
        <div className="about-copy">
          <p>Me especializo en convertir necesidades de negocio en aplicaciones mantenibles. Disfruto trabajar en el punto donde el diseño, la ingeniería y la experiencia de usuario se encuentran.</p>
          <p>Mi enfoque combina interfaces responsive, APIs bien estructuradas y bases de datos confiables. Busco que cada solución sea comprensible hoy y fácil de evolucionar mañana.</p>
          <dl className="facts">
            <div><dt>Enfoque</dt><dd>Desarrollo web integral</dd></div>
            <div><dt>Ubicación</dt><dd>Perú</dd></div>
            <div><dt>Modalidad</dt><dd>Remoto y presencial</dd></div>
          </dl>
        </div>
      </div>
    </section>
  )
}
