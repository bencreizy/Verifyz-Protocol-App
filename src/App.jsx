
import Nav from './components/Nav'
import Hero from './components/Hero'
import Features from './components/Features'
import Timeline from './components/Timeline'
import WinnersCTA from './components/WinnersCTA'
import Presale from './components/Presale'
import ProofSubmit from './components/ProofSubmit'
import Footer from './components/Footer'
import './styles.css'

export default function App() {
  return (
    <div className="bg-circuit bg-cover bg-center min-h-screen text-white relative">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      <div className="relative z-10">
      <Nav />
      <main>
        <Hero />
        <Features />
        <Timeline />
        <WinnersCTA />
        <Presale />
        <ProofSubmit />
      </main>
      <Footer />
      </div>
    </div>
  )
}
