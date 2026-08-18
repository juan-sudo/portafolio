import { profile } from '../../data/portfolio'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p>Diseñado y desarrollado con atención al detalle.</p>
      </div>
    </footer>
  )
}
