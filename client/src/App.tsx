
import './index.css';

export default function App() {
  return (
    <div className="bg-circuit bg-cover bg-center min-h-screen relative text-white">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6">
        <img
          src="/verifyz-logo.png"
          alt="VeriFyz Logo"
          className="mb-6 w-24 h-24 animate-pulse-slow glow-hover"
        />
        <h1 className="text-5xl font-extrabold text-glow cyber-text">VeriFyz Protocol</h1>
        <p className="mt-4 text-lg text-brand-neon">
          Real proof in presence. Verified, Anonymous, Rewarded.
        </p>
        <button className="mt-8 px-8 py-3 rounded-lg bg-brand-neon text-black font-semibold shadow-glow hover:scale-105 hover:shadow-brand-neon/70 transition cyber-button">
          Get Started
        </button>
      </div>
    </div>
  );
}
