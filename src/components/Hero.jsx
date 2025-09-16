export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center text-center px-4 pt-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 mx-auto">
          <img src="/verifyz-logo-main.png" alt="VeriFyz Protocol" className="w-48 h-48 object-contain mx-auto" />
        </div>

        <p className="text-xl mb-8 text-brand-neon max-w-2xl mx-auto">
          Real proof in presence.
        </p>

        <button className="cyber-button px-8 py-4 text-lg font-semibold rounded-lg glow-hover transition-all duration-300">
          Join Presale
        </button>
      </div>
    </section>
  )
}