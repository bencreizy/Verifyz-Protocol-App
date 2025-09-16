export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center text-center px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 animate-pulse-slow glow-hover bg-gradient-to-r from-green-400 to-cyan-400 rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-2xl">V</span>
          </div>
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