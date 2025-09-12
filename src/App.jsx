
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
    <div className="bg-verifyz-gradient min-h-screen text-white bg-fingerprint">
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
  )
}
