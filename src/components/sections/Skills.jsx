import { skills } from '../../data/portfolio'
import { SectionHeading } from '../ui/SectionHeading'

export function Skills() {
  return (
    <section className="section section-muted" id="tecnologias">
      <div className="container">
        <SectionHeading eyebrow="03 / Tecnologías" title="Herramientas con propósito." description="Un stack versátil para crear productos web completos y sostenibles." />
        <ul className="skills-grid">
          {skills.map((skill) => (
            <li className="skill-card" key={skill.name}>
              <img src={skill.icon} alt="" />
              <div><strong>{skill.name}</strong><span>{skill.category}</span></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
