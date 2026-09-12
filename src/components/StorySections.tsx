import { ArrowUpRight, Check, CheckCircle2, ChevronDown, ChevronRight, Clock3, Dumbbell, Instagram, Play, UtensilsCrossed } from 'lucide-react'
import { motion } from 'framer-motion'
import { consultationUrl } from '../data/content'
import { EditorialCarousel, type EditorialSlide } from './EditorialCarousel'

const reveal = {
  initial: { opacity: 0, y: 34 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: .18 },
  transition: { duration: .75, ease: [0.16, 1, 0.3, 1] as const },
}

const Button = ({ label = 'Quero solicitar uma vaga' }: { label?: string }) => (
  <a className="gold-button" href={consultationUrl} target="_blank" rel="noreferrer">
    {label}<i><ArrowUpRight size={17} /></i>
  </a>
)

export function Desire() {
  return (
    <section className="desire paper-section" id="jornada">
      <motion.div className="center-copy" {...reveal}>
        <h2>Você treina, mas o seu corpo <em>não muda como deveria?</em></h2>
        <p>Treinos genéricos, dieta difícil de seguir e falta de ajustes podem fazer você se esforçar sem alcançar o resultado que espera.</p>
        <blockquote>Muitas vezes, é falta de um profissional que sabe perfeitamente o caminho que você deve seguir.</blockquote>
      </motion.div>
    </section>
  )
}

export function Expertise() {
  return (
    <section className="expertise dark-section" id="acompanhamento">
      <motion.div className="portrait-card" {...reveal}>
        <img src="/assets/media/igor-mentor-concept.jpg" alt="Imagem conceitual de Ígor Souza sentado, com as mãos entrelaçadas" />
        <div className="portrait-mark"><img src="/assets/media/igor-logo-gold.png" alt="" /></div>
        <span className="concept-label">Imagem conceitual gerada por IA</span>
      </motion.div>
      <motion.div className="expertise-copy" {...reveal}>
        <h2>Como funciona a <em>consultoria individual.</em></h2>
        <p>Antes de montar o plano, Ígor analisa seu objetivo, sua rotina, seu histórico e o que você consegue executar de verdade.</p>
        <ul>
          <li><span>01</span>Avaliação do seu objetivo, rotina e nível de treinamento</li>
          <li><span>02</span>Treino e dieta definidos de acordo com a sua meta</li>
          <li><span>03</span>Acompanhamento do progresso e ajustes quando necessário</li>
        </ul>
        <Button label="Quero um plano personalizado" />
      </motion.div>
    </section>
  )
}

function AppPhone({ view }: { view: 'today' | 'diet' }) {
  const isToday = view === 'today'

  return (
    <div className={`app-phone app-phone--${view}`} aria-label={`Mockup ilustrativo do aplicativo — ${isToday ? 'treino do dia' : 'dieta do dia'}`}>
      <div className="app-phone__frame">
        <span className="app-phone__speaker" aria-hidden="true" />
        <div className="app-phone__screen">
          <div className="app-ui__status" aria-hidden="true"><b>9:41</b><span>● ●●</span></div>
          <header className="app-ui__header">
            <span className="app-ui__brand"><img src="/assets/media/igor-logo-gold.png" alt="" /></span>
            <span><small>CONSULTORIA</small><strong>Ígor Souza</strong></span>
            <i aria-hidden="true">IS</i>
          </header>

          {isToday ? (
            <>
              <div className="app-ui__welcome"><small>SEU PLANO</small><h3>Boa tarde,<br />Mariana.</h3><p>Seu treino está pronto para hoje.</p></div>
              <div className="app-ui__hero-card">
                <div className="app-ui__hero-top"><span><Dumbbell size={15} /> TREINO DE HOJE</span><i><Play size={14} fill="currentColor" /></i></div>
                <h4>Inferiores A</h4>
                <div className="app-ui__meta"><span><Clock3 size={12} /> 46 min</span><span>6 exercícios</span></div>
                <div className="app-ui__progress"><i /></div>
                <small>Pronta para começar</small>
              </div>
              <div className="app-ui__section-line"><strong>Seu ritmo</strong><span>Esta semana</span></div>
              <div className="app-ui__week" aria-hidden="true">
                {['S', 'T', 'Q', 'Q', 'S'].map((day, index) => <span className={index < 3 ? 'is-done' : index === 3 ? 'is-current' : ''} key={`${day}-${index}`}>{day}<i>{index < 3 ? <Check size={9} /> : index + 2}</i></span>)}
              </div>
            </>
          ) : (
            <>
              <div className="app-ui__plan-head"><small>SUA DIETA</small><h3>Plano alimentar,<br /><em>sempre à mão.</em></h3></div>
              <div className="app-ui__calendar">
                <div><span><UtensilsCrossed size={15} /></span><p><small>PLANO DO DIA</small><strong>Dieta personalizada</strong></p><ChevronRight size={16} /></div>
                <div className="app-ui__calendar-progress"><i /></div>
                <small>Próxima refeição: almoço</small>
              </div>
              <div className="app-ui__section-line"><strong>Refeições de hoje</strong><span>Ver dieta</span></div>
              <div className="app-ui__workouts">
                <article><span className="is-complete"><CheckCircle2 size={16} /></span><p><strong>Café da manhã</strong><small>Concluído</small></p><ChevronRight size={15} /></article>
                <article><span><UtensilsCrossed size={16} /></span><p><strong>Almoço</strong><small>Próxima refeição</small></p><ChevronRight size={15} /></article>
                <article><span><UtensilsCrossed size={16} /></span><p><strong>Lanche da tarde</strong><small>Mais tarde</small></p><ChevronRight size={15} /></article>
              </div>
            </>
          )}

          <nav className="app-ui__nav" aria-hidden="true"><span className="is-active"><i />Início</span><span><i />Treinos</span><span><i />Dieta</span></nav>
        </div>
      </div>
    </div>
  )
}

export function AppExperience() {
  return (
    <div className="app-chapter" id="aplicativo">
      <section className="app-intro paper-section">
        <motion.div className="app-copy app-copy--intro" {...reveal}>
          <h2>Todos os alunos recebem acesso ao <em>aplicativo da consultoria.</em></h2>
          <p>No aplicativo, você consulta seu treino, acompanha sua dieta e acessa as orientações da consultoria sempre que precisar.</p>
          <Button label="Não posso ficar de fora." />
        </motion.div>
        <motion.div className="app-device-stage app-device-stage--intro" {...reveal}>
          <span className="app-orbit app-orbit--one" aria-hidden="true" />
          <span className="app-orbit app-orbit--two" aria-hidden="true" />
          <AppPhone view="today" />
          <small className="app-mockup-note">Interface ilustrativa do aplicativo</small>
        </motion.div>
      </section>

      <section className="app-flow dark-section">
        <motion.div className="app-device-stage app-device-stage--flow" {...reveal}>
          <span className="app-flow__glow" aria-hidden="true" />
          <AppPhone view="diet" />
          <small className="app-mockup-note">Interface ilustrativa do aplicativo</small>
        </motion.div>
        <motion.div className="app-copy app-copy--flow" {...reveal}>
          <h2>Abra o aplicativo e veja <em>exatamente o que fazer.</em></h2>
          <p>Seu treino e sua dieta ficam organizados em um só lugar para facilitar a execução e o acompanhamento da consultoria.</p>
          <ul className="app-benefits">
            <li><span>01</span><div><strong>Treino e dieta em um só lugar</strong><small>Consulte o seu planejamento diretamente pelo celular.</small></div></li>
            <li><span>02</span><div><strong>Mais clareza para executar</strong><small>Veja o que foi planejado antes de treinar ou fazer uma refeição.</small></div></li>
            <li><span>03</span><div><strong>Acompanhamento mais organizado</strong><small>Tenha as informações da consultoria disponíveis durante a rotina.</small></div></li>
          </ul>
          <Button label="Faz sentido para mim" />
        </motion.div>
      </section>
    </div>
  )
}

const resultSlides: EditorialSlide[] = [
  { src: '/assets/media/result-before-after-01.png', alt: 'Comparativo de evolução corporal enviado por uma aluna', label: 'Resultado 01' },
  { src: '/assets/media/result-before-after-02.png', alt: 'Comparativo lateral de evolução corporal enviado por uma aluna', label: 'Resultado 02' },
  { src: '/assets/media/result-before-after-03.png', alt: 'Comparativo de evolução física em ambiente de academia', label: 'Resultado 03' },
  { src: '/assets/media/result-before-after-04.png', alt: 'Comparativo lateral de composição corporal', label: 'Resultado 04' },
  { src: '/assets/media/result-before-after-05.png', alt: 'Comparativo de evolução de definição e massa muscular', label: 'Resultado 05' },
]

export function Method() {
  return (
    <section className="results paper-section" id="resultados">
      <motion.div className="section-title" {...reveal}>
        <h2>Veja os resultados das <em>alunas da consultoria.</em></h2>
        <p>Confira fotos de antes e depois de mulheres que seguiram um plano personalizado com acompanhamento.</p>
      </motion.div>
      <motion.div className="results-stage" {...reveal}>
        <EditorialCarousel slides={resultSlides} ariaLabel="Resultados de antes e depois" variant="results" />
      </motion.div>
      <div className="results-action"><Button /><small>Resultados individuais variam conforme contexto, adesão e continuidade.</small></div>
    </section>
  )
}

const programs = [
  { n: '01', title: 'Hipertrofia', image: '/assets/media/program-hypertrophy-result.png', alt: 'Antes e depois de aluna que ganhou 7,5 kg em um processo de hipertrofia', text: 'Treino progressivo para aumentar massa muscular, força e volume de forma planejada.' },
  { n: '02', title: 'Emagrecimento', image: '/assets/media/program-weightloss-result.png', alt: 'Antes e depois de aluna que eliminou 12 kg em um processo de emagrecimento', text: 'Treino e dieta ajustados para reduzir gordura sem depender de uma rotina impossível de manter.' },
]

export function Programs() {
  return (
    <section className="programs dark-section" id="metodo">
      <motion.div className="programs-title" {...reveal}>
        <h2>Hipertrofia<br /><em>ou emagrecimento.</em></h2>
      </motion.div>
      <div className="program-stack">
        {programs.map((program, index) => (
          <motion.article key={program.title} {...reveal} transition={{ ...reveal.transition, delay: index * .08 }}>
            <div className="program-image"><img src={program.image} alt={program.alt} /></div>
            <div className="program-copy"><span>{program.n}</span><h3>{program.title}</h3><p>{program.text}</p><Button label="Quero um plano para este objetivo" /></div>
          </motion.article>
        ))}
      </div>
      <small className="fine-print">O treino e a dieta são definidos após a análise do seu objetivo, rotina e histórico.</small>
    </section>
  )
}

export function About() {
  return (
    <section className="about paper-section" id="sobre">
      <div className="about-collage">
        <img src="/assets/media/igor-tablet-concept.jpg" alt="Imagem conceitual de Ígor Souza analisando um plano em um tablet" />
        <img src="/assets/media/igor-bench-concept.jpg" alt="Imagem conceitual de Ígor Souza sentado em um estúdio de treinamento" />
        <div className="about-seal"><img src="/assets/media/igor-logo-gold.png" alt="" /><small>PERFORMANCE</small></div>
        <span className="concept-label">Imagens conceituais geradas por IA</span>
      </div>
      <motion.div className="about-copy" {...reveal}>
        <h2>Conheça <em>Ígor Souza.</em></h2>
        <p>Farmacêutico, nutricionista e coach bodybuilder com vasta experiência em emagrecimento, hipertrofia, estética e performance.</p>
        <p>Ao longo da minha carreira, ajudei mais de 1.000 pessoas a transformarem seus corpos e hábitos alimentares, alcançando resultados duradouros.</p>
        <p>Combinando conhecimentos de saúde e nutrição com estratégias de treinamento personalizadas, proporciono suporte integral para a conquista dos objetivos de cada indivíduo.</p>
        <p>Meu compromisso é promover resultados associados ao seu bem-estar, autoconfiança e qualidade de vida por meio de mudanças sustentáveis e eficazes.</p>
        <Button label="Quero ser acompanhada pelo Ígor" />
      </motion.div>
    </section>
  )
}

export function PositioningStrip() {
  const message = 'TREINO PERSONALIZADO  ·  DIETA NO APLICATIVO  ·  ACOMPANHAMENTO INDIVIDUAL  ·  AJUSTES PERIÓDICOS  ·  '
  return (
    <div className="positioning-strip" aria-label="Treino personalizado, dieta no aplicativo, acompanhamento individual e ajustes periódicos">
      <div>{message.repeat(4)}</div>
    </div>
  )
}

const testimonialSlides: EditorialSlide[] = [
  { src: '/assets/media/testimonial-01.png', alt: 'Depoimento de aluna sobre o resultado do acompanhamento', label: 'Depoimento 01' },
  { src: '/assets/media/testimonial-02.png', alt: 'Depoimento de aluna sobre redução de medidas e percepção do treino', label: 'Depoimento 02' },
  { src: '/assets/media/testimonial-03.png', alt: 'Depoimento de aluna sobre assistência e orientação', label: 'Depoimento 03' },
  { src: '/assets/media/testimonial-04.png', alt: 'Depoimento de aluna sobre confiança, suporte e resultados', label: 'Depoimento 04' },
  { src: '/assets/media/testimonial-05.png', alt: 'Depoimento de aluna sobre gratidão e evolução no processo', label: 'Depoimento 05' },
  { src: '/assets/media/testimonial-06.png', alt: 'Depoimento de aluna agradecendo pelo acompanhamento', label: 'Depoimento 06' },
]

export function Process() {
  return (
    <section className="testimonials dark-section" id="depoimentos">
      <motion.div className="section-title dark" {...reveal}>
        <h2>Veja o que as alunas dizem <em>sobre a consultoria.</em></h2>
        <p>Depoimentos enviados por alunas sobre os treinos, o suporte recebido e os resultados alcançados.</p>
      </motion.div>
      <motion.div className="testimonials-stage" {...reveal}>
        <EditorialCarousel slides={testimonialSlides} ariaLabel="Depoimentos de alunas" variant="testimonials" />
      </motion.div>
      <div className="testimonials-action"><Button label="Quero ter esse acompanhamento" /></div>
    </section>
  )
}

export function Application() {
  return (
    <section className="application dark-section" id="como-funciona">
      <div className="application-panel">
        <div><span className="section-eyebrow">Como começar</span><h2>Veja como entrar<br /><em>para a consultoria.</em></h2><Button /></div>
        <ol>
          {['Preencha o formulário de aplicação', 'Ígor analisa seu objetivo e seu perfil', 'Você recebe o contato se houver uma vaga adequada', 'Seu treino e sua dieta são personalizados', 'Você recebe acesso ao aplicativo', 'Ígor acompanha seu progresso e faz os ajustes'].map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong><Check size={15} /></li>)}
        </ol>
      </div>
    </section>
  )
}

export function FinalCta() {
  const faqs = [
    ['O aplicativo está incluso na consultoria?', 'Sim. Todos os alunos recebem acesso ao aplicativo usado para acompanhar o treino e a dieta.'],
    ['O treino e a dieta são personalizados?', 'Sim. O planejamento é definido após a análise do seu objetivo, rotina, histórico e nível de treinamento.'],
    ['O que acontece depois que envio o formulário?', 'Ígor analisa suas respostas. Se houver uma vaga adequada ao seu perfil, você recebe o contato com os próximos passos.'],
    ['A aplicação garante uma vaga?', 'Não. A aplicação é o primeiro passo para avaliar se o momento e o perfil combinam com a proposta.'],
    ['Quanto tempo leva para preencher?', 'O formulário de aplicação leva menos de três minutos.'],
  ]
  return (
    <>
      <section className="faq paper-section" id="duvidas">
        <div className="faq-intro"><span className="section-eyebrow">Dúvidas frequentes</span><h2>Perguntas sobre <em>a consultoria.</em></h2><Button /></div>
        <div className="faq-list">{faqs.map(([q, a]) => <details key={q}><summary>{q}<ChevronDown size={18} /></summary><p>{a}</p></details>)}</div>
      </section>

      <section className="closing dark-section">
        <img src="/assets/media/igor-hero-background-mobile-fitness-v2.webp" alt="Academia com iluminação sofisticada" />
        <div className="closing-shade" />
        <motion.div className="closing-copy" {...reveal}>
          <h2>Preencha sua <em>aplicação.</em></h2>
          <p>Responda ao formulário para Ígor conhecer seu objetivo e avaliar se existe uma vaga adequada para você na consultoria.</p>
          <Button label="Quero solicitar uma vaga" />
          <small>Leva menos de 3 minutos. O envio da aplicação não garante vaga.</small>
        </motion.div>
      </section>

      <footer className="footer dark-section">
        <div className="brand"><img className="brand-logo" src="/assets/media/igor-logo-gold.png" alt="Ígor Souza" /></div>
        <nav><a href="#aplicativo">Aplicativo</a><a href="#metodo">Método</a><a href="#acompanhamento">Acompanhamento</a><a href="#como-funciona">Como funciona</a><a href="#duvidas">Dúvidas</a></nav>
        <a href="https://www.instagram.com/igorsouza.es/" target="_blank" rel="noreferrer"><Instagram size={17} /><span>Instagram</span><ArrowUpRight size={14} /></a>
      </footer>
    </>
  )
}
