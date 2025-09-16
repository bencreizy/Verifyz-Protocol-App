
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
    <div className="min-h-screen text-white relative" style={{backgroundImage: "url('/attached_assets/circuit_board_cyan_upscaled_4k_1757982811493.png')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-15"></div>
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
