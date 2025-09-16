
import './index.css';
import circuitBg from './assets/circuit-bg.png';

export default function App() {
  return (
    <div className="min-h-screen relative text-white bg-gradient-to-b from-brand-900 via-brand-800 to-brand-700">
      {/* Circuit background */}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: `linear-gradient(rgba(11, 16, 32, 0.3), rgba(11, 16, 32, 0.3)), url(${circuitBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundBlendMode: 'overlay',
          minHeight: '100vh'
        }}
      ></div>
      
      {/* Lighter gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-900/30 via-brand-800/20 to-brand-700/30"></div>

      {/* Temporary test image - remove this once background works */}
      <img src={circuitBg} alt="test" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.5, width: '200px', zIndex: 999 }} />
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6">
        {/* Logo circle with V */}
        <div className="mb-6 w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-green-400 flex items-center justify-center animate-pulse-slow glow-hover">
          <span className="text-2xl font-bold text-black">V</span>
        </div>
        
        <h1 className="text-5xl font-extrabold text-glow cyber-text">VeriFyz Protocol</h1>
        <p className="mt-4 text-lg text-cyan-400">
          Real proof in presence. Verified, Anonymous, Rewarded.
        </p>
        <button className="mt-8 px-8 py-3 rounded-lg bg-cyan-500 text-black font-semibold shadow-glow hover:scale-105 hover:shadow-cyan-500/70 transition cyber-button">
          Get Started
        </button>
      </div>
    </div>
  );
}
