import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scanPoints } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export function ScanNarrative() {
  const section = useRef<HTMLElement>(null)

  useGSAP(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    gsap.fromTo('.scan-beam', { yPercent: -30 }, {
      yPercent: 650,
      ease: 'none',
      scrollTrigger: { trigger: section.current, start: 'top top', end: 'bottom bottom', scrub: 0.35 },
    })

    gsap.utils.toArray<HTMLElement>('.scan-point').forEach((point, index) => {
      gsap.fromTo(point, { opacity: 0.18, x: index % 2 ? 20 : -20 }, {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: section.current,
          start: `${12 + index * 17}% top`,
          end: `${28 + index * 17}% top`,
          scrub: true,
        },
      })
    })
  }, { scope: section })

  return (
    <section className="scan-section" id="diagnostico" ref={section}>
      <div className="scan-sticky">
        <div className="section-kicker"><span>02</span> Antes da prescrição</div>
        <div className="scan-copy">
          <p className="eyebrow">Diagnóstico</p>
          <h2>Antes de transformar,<br /><em>é preciso entender.</em></h2>
          <p>Nenhum corpo existe fora da rotina. O método começa pela leitura do seu momento — para que cada decisão tenha propósito.</p>
        </div>

        <div className="scan-figure" aria-label="Representação visual de leitura corporal">
          <img src="/assets/media/hero-woman-placeholder.png" alt="Mulher em meia-luz, imagem provisória" />
          <div className="scan-field" />
          <div className="scan-beam"><span /></div>
          <div className="scan-axis axis-x" />
          <div className="scan-axis axis-y" />
          <span className="coordinate coordinate-a">24° 18' 03</span>
          <span className="coordinate coordinate-b">FORM / ANALYSIS</span>
        </div>

        <div className="scan-points">
          {scanPoints.map((point) => (
            <article className="scan-point" key={point.code}>
              <span>{point.code}</span>
              <div><h3>{point.title}</h3><p>{point.text}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
