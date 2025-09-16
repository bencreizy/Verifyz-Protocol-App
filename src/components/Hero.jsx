export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center text-center px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 mx-auto">
          <img src="/assets/logo.png" alt="VeriFyz Protocol" className="w-32 h-32 object-contain mx-auto" />
        </div>

        <h1 className="text-6xl font-extrabold mb-6 text-glow cyber-text">
          VeriFyz Protocol
        </h1>

        <p className="text-xl mb-8 text-brand-neon max-w-2xl mx-auto">
          Real proof in presence. Verified, Anonymous, Rewarded.
        </p>

        <button className="cyber-button px-8 py-4 text-lg font-semibold rounded-lg glow-hover transition-all duration-300">
          Get Started
        </button>
      </div>
    </section>
  )
}