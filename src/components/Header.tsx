import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { consultationUrl } from '../data/content'

const links = [
  { label: 'Aplicativo', href: '#aplicativo' },
  { label: 'Método', href: '#metodo' },
  { label: 'Acompanhamento', href: '#acompanhamento' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Dúvidas', href: '#duvidas' },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="Ígor Souza — início">
        <img className="brand-logo" src="/assets/media/igor-logo-gold.png" alt="" />
      </a>

      <nav className="desktop-nav" aria-label="Navegação principal">
        {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        <a className="header-contact" href={consultationUrl} target="_blank" rel="noreferrer">Contato</a>
      </nav>

      <button className="menu-trigger" type="button" onClick={() => setOpen(true)} aria-label="Abrir menu">
        <Menu size={25} strokeWidth={1.7} />
      </button>

      <div className={`mobile-nav ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <button type="button" onClick={() => setOpen(false)} aria-label="Fechar menu"><X /></button>
        {links.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}
        <a href={consultationUrl} target="_blank" rel="noreferrer">Iniciar aplicação</a>
      </div>
    </header>
  )
}
