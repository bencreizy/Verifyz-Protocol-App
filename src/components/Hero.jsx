
export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center text-center px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <img 
            src="/verifyz-logo-main.png" 
            alt="VeriFyz Protocol" 
            className="w-64 h-auto mx-auto object-contain filter drop-shadow-lg"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(0, 247, 255, 0.6)) drop-shadow(0 0 40px rgba(255, 52, 210, 0.4))'
            }}
          />
        </div>
      </div>
    </section>
  )
}
