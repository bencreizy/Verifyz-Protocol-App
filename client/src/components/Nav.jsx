
import React from 'react'

export default function Nav() {
  return (
    <nav className="p-6 bg-brand-900/50 backdrop-blur-sm border-b border-brand-neon/20">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/verifyz-logo.png" alt="VeriFyz" className="h-8 w-8" />
          <span className="text-2xl font-bold text-brand-neon">VeriFyz</span>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#features" className="text-white hover:text-brand-neon transition-colors">Features</a>
          <a href="#timeline" className="text-white hover:text-brand-neon transition-colors">Timeline</a>
          <a href="#presale" className="text-white hover:text-brand-neon transition-colors">Presale</a>
        </div>
      </div>
    </nav>
  )
}
