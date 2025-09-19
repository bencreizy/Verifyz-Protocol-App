
import React from 'react'

export default function Footer() {
  return (
    <footer className="py-12 px-6 bg-brand-900/70 border-t border-brand-neon/20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <img src="/verifyz-logo.png" alt="VeriFyz" className="h-6 w-6" />
            <span className="text-xl font-bold text-brand-neon">VeriFyz</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-300 hover:text-brand-neon transition-colors">Privacy</a>
            <a href="#" className="text-gray-300 hover:text-brand-neon transition-colors">Terms</a>
            <a href="#" className="text-gray-300 hover:text-brand-neon transition-colors">Contact</a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-brand-neon/10 text-center text-gray-400">
          <p>&copy; 2024 VeriFyz Protocol. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
