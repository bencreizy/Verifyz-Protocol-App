
export default function Footer(){
  return (
    <footer className="mt-16 border-t border-white/10 py-10">
      <div className="section flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-white/70 text-sm">© 2025 VeriFyz Protocol</div>
        <div className="flex gap-5 text-sm">
          <a href="#terms" className="opacity-80 hover:opacity-100">Terms</a>
          <a href="#privacy" className="opacity-80 hover:opacity-100">Privacy</a>
          <a href="https://github.com" className="opacity-80 hover:opacity-100">GitHub</a>
        </div>
      </div>
    </footer>
  )
}
