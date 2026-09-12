import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { consultationUrl } from '../data/content'

export function Hero() {
  return (
    <section className="hero" id="inicio">
      <picture className="hero-picture" aria-hidden="true">
        <source media="(max-width: 700px)" srcSet="/assets/media/igor-hero-background-mobile-fitness-v2.webp" />
        <img src="/assets/media/igor-hero-desktop.png" alt="" />
      </picture>
      <picture className="hero-expert-picture" aria-hidden="true">
        <img src="/assets/media/igor-expert-cutout-mobile.webp" alt="" />
      </picture>
      <div className="hero-shade" />
      <div className="hero-grain" />

      <motion.div
        className="hero-copy"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .9, delay: .2, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1>
          <span className="hero-title-line">Afine sua cintura.</span>{' '}
          <span className="hero-title-line"><em>Defina seus músculos.</em></span>
        </h1>
        <p>Consultoria online para mulheres que querem emagrecer, ganhar massa muscular ou definir o corpo com um plano personalizado.</p>

        <span className="hero-note">Preencha o formulário para solicitar uma vaga.</span>
        <a className="gold-button" href={consultationUrl} target="_blank" rel="noreferrer">
          Quero solicitar uma vaga
          <i><ArrowUpRight size={18} /></i>
        </a>

        <div className="hero-proof">
          <div className="mini-seal"><img src="/assets/media/igor-logo-gold.png" alt="" /></div>
          <div><strong>Treino e dieta personalizados</strong><span>acompanhamento pelo aplicativo</span></div>
        </div>
      </motion.div>

      <div className="hero-monogram" aria-hidden="true"><img src="/assets/media/igor-logo-gold.png" alt="" /><small>TREINO · DIETA · ACOMPANHAMENTO</small></div>
      <a className="hero-scroll" href="#jornada" aria-label="Continuar a página"><ArrowDown size={18} /></a>
    </section>
  )
}
