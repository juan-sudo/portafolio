import { experience } from '../../data/portfolio'
import { SectionHeading } from '../ui/SectionHeading'

export function Experience() {
  return (
    <section className="section" id="experiencia">
      <div className="container">
        <SectionHeading eyebrow="02 / Experiencia" title="Experiencia que construye criterio." description="Trabajo con una visión completa del producto: desde la interfaz hasta los datos." />
        <div className="timeline">
          {experience.map((item) => (
            <article className="experience-card" key={`${item.company}-${item.period}`}>
              <p className="period">{item.period}</p>
              <div>
                <h3>{item.role}</h3>
                <p className="company">{item.company}</p>
                <p>{item.description}</p>
                <ul className="tag-list" aria-label="Tecnologías utilizadas">
                  {item.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
