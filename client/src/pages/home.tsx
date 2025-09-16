
export default function Home() {
  return (
    <div className="bg-circuit bg-cover bg-center min-h-screen relative text-white flex items-center justify-center">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <div className="mx-auto mb-6 w-20 h-20 flex items-center justify-center">
          <img 
            src="/assets/images/circuit-bg.png" 
            alt="VeriFyz Logo" 
            className="w-20 h-20 object-contain filter brightness-0 invert"
          />
        </div>
        <h1 className="text-5xl font-extrabold">VeriFyz Protocol</h1>
        <p className="mt-4 text-lg">Real proof in presence. Verified, Anonymous, Rewarded.</p>
        <button className="mt-8 px-8 py-3 rounded-lg bg-cyan-400 text-black font-semibold shadow-lg hover:scale-105 hover:shadow-cyan-400/70 transition-all duration-300 hover:shadow-lg">
          Get Started
        </button>
      </div>
    </div>
  );
}
