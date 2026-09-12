import { Header } from './components/Header'
import { Hero } from './components/Hero'
import {
  About,
  AppExperience,
  Application,
  Desire,
  Expertise,
  FinalCta,
  Method,
  PositioningStrip,
  Process,
  Programs,
} from './components/StorySections'

function App() {
  return (
    <main>
      <Header />
      <Hero />
      <Desire />
      <Expertise />
      <AppExperience />
      <Method />
      <Programs />
      <About />
      <PositioningStrip />
      <Process />
      <Application />
      <FinalCta />
    </main>
  )
}

export default App
