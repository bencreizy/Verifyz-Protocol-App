
import Countdown from './Countdown'
import WalletConnect from './WalletConnect'

export default function Presale(){
  return (
    <section id="presale" className="section py-14">
      <h2 className="text-3xl mb-2">VeriFyz Token Presale</h2>
      <p className="text-white/75 mb-6">Buy VeriFyz Tokens at $0.05 during our presale grand launch.</p>
      <div className="mb-6"><Countdown /></div>
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <WalletConnect />
        <div className="card-neon p-6">
          <label className="block text-sm mb-2">USD Amount</label>
          <input className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 mb-4" placeholder="100" />
          <p className="text-xs text-white/60 mt-2">MATIC/USD: $0.27 • Token Price: $0.05</p>
          <div className="mt-4 text-right">
            <button className="button-neon">Buy VFYZ</button>
          </div>
        </div>
      </div>
      <div className="card-neon p-4 mt-6 text-sm text-white/80">
        Presale runs Sept 15–29 • Launches Oct 6
      </div>
    </section>
  )
}
