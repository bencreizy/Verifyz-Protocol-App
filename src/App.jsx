
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
      {/* Subtle circuit background overlay */}
      <div className="absolute inset-0" style={{backgroundImage: "url('/attached_assets/circuit_board_cyan_upscaled_4k_1757982811493.png')", backgroundSize: '200% 200%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', opacity: '0.08'}}></div>
      {/* Additional gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-900/90 via-brand-800/80 to-brand-700/90"></div>
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
