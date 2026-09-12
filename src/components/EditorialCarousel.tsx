import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type WheelEvent } from 'react'

export type EditorialSlide = {
  src: string
  alt: string
  label: string
}

type EditorialCarouselProps = {
  slides: EditorialSlide[]
  ariaLabel: string
  variant: 'results' | 'testimonials'
}

export function EditorialCarousel({ slides, ariaLabel, variant }: EditorialCarouselProps) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const pointerStart = useRef<number | null>(null)
  const lastWheelAt = useRef(0)

  const move = useCallback((direction: number) => {
    setActive((current) => (current + direction + slides.length) % slides.length)
  }, [slides.length])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (paused || reducedMotion) return

    const timer = window.setInterval(() => move(1), 5200)
    return () => window.clearInterval(timer)
  }, [move, paused])

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    const delta = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX
    const now = Date.now()
    if (Math.abs(delta) < 18 || now - lastWheelAt.current < 650) return
    lastWheelAt.current = now
    move(delta > 0 ? 1 : -1)
  }

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointerStart.current = event.clientX
  }

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStart.current === null) return
    const distance = event.clientX - pointerStart.current
    pointerStart.current = null
    if (Math.abs(distance) > 42) move(distance < 0 ? 1 : -1)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
    event.preventDefault()
    move(event.key === 'ArrowRight' ? 1 : -1)
  }

  return (
    <div
      className={`editorial-carousel editorial-carousel--${variant}`}
      role="region"
      aria-roledescription="carrossel"
      aria-label={ariaLabel}
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onWheel={handleWheel}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => { pointerStart.current = null }}
    >
      <div className="editorial-carousel__viewport">
        <div className="editorial-carousel__track" style={{ transform: `translate3d(-${active * 100}%, 0, 0)` }}>
          {slides.map((slide, index) => (
            <figure
              className="editorial-slide"
              key={slide.src}
              aria-roledescription="slide"
              aria-label={`${index + 1} de ${slides.length}`}
              aria-hidden={index !== active}
            >
              <div className="editorial-slide__media">
                <img src={slide.src} alt={slide.alt} loading={index === 0 ? 'eager' : 'lazy'} />
              </div>
              <figcaption>{slide.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="editorial-carousel__controls">
        <div className="editorial-carousel__count" aria-live="polite">
          <strong>{String(active + 1).padStart(2, '0')}</strong>
          <span>/ {String(slides.length).padStart(2, '0')}</span>
        </div>
        <div className="editorial-carousel__dots" aria-label="Escolher slide">
          {slides.map((slide, index) => (
            <button
              type="button"
              key={slide.src}
              className={index === active ? 'is-active' : ''}
              onClick={() => setActive(index)}
              aria-label={`Mostrar ${slide.label.toLowerCase()}`}
              aria-current={index === active ? 'true' : undefined}
            />
          ))}
        </div>
        <div className="editorial-carousel__arrows">
          <button type="button" onClick={() => move(-1)} aria-label="Slide anterior"><ArrowLeft size={18} /></button>
          <button type="button" onClick={() => move(1)} aria-label="Próximo slide"><ArrowRight size={18} /></button>
        </div>
      </div>
    </div>
  )
}
