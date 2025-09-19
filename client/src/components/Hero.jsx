
import React from 'react'

export default function Hero() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-brand-neon bg-clip-text text-transparent">
          VeriFyz Protocol
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
          The future of location verification and proof-of-presence rewards on the blockchain
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-brand-neon text-brand-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-brand-neon/90 transition-colors">
            Join Presale
          </button>
          <button className="border-2 border-brand-neon text-brand-neon px-8 py-4 rounded-lg font-bold text-lg hover:bg-brand-neon/10 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </section>
  )
}
