
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
    <div className="min-h-screen text-white relative bg-verifyz-gradient">
      {/* Circuit background overlay */}
      <div className="absolute inset-0" style={{backgroundImage: "url('/circuit-bg.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', opacity: '0.15'}}></div>
      {/* Additional gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-900/70 via-brand-800/60 to-brand-700/70"></div>
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
