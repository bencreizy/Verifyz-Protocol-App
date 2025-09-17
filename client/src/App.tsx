import './index.css';
import circuitBg from '@assets/circuit_board_cyan_upscaled_4k_1758068194486.png';

console.log('Imported URL:', circuitBg);

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

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6">
        <div className="mb-8">
          <img 
            src="/verifyz-logo-main.png" 
            alt="VeriFyz Protocol" 
            className="w-64 h-auto mx-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}