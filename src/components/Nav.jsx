export default function Nav() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-black/40 border-b border-white/10">
      <div className="section flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <img src="/assets/verifyz-logo.png" alt="VeriFyz Protocol" className="w-8 h-8" />
          <span className="font-bold">VeriFyz Protocol</span>
        </div>
        <nav className="hidden md:flex gap-6 text-sm">
          <a href="#home">Home</a>
          <a href="#verify">Verify</a>
          <a href="#presale">Token Presale</a>
          <a href="#api">API</a>
          <a href="#about">About</a>
        </nav>
      </div>
    </header>
  )
}