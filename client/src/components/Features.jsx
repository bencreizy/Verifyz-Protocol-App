
import React from 'react'

export default function Features() {
  return (
    <section id="features" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-brand-neon">Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-brand-800/50 p-8 rounded-lg border border-brand-neon/20">
            <h3 className="text-2xl font-bold mb-4 text-brand-neon">Location Verification</h3>
            <p className="text-gray-300">Secure, blockchain-based proof of physical presence using advanced cryptographic methods.</p>
          </div>
          <div className="bg-brand-800/50 p-8 rounded-lg border border-brand-neon/20">
            <h3 className="text-2xl font-bold mb-4 text-brand-neon">Token Rewards</h3>
            <p className="text-gray-300">Earn VFYZ tokens for verified location check-ins and participation in the ecosystem.</p>
          </div>
          <div className="bg-brand-800/50 p-8 rounded-lg border border-brand-neon/20">
            <h3 className="text-2xl font-bold mb-4 text-brand-neon">Decentralized</h3>
            <p className="text-gray-300">Fully decentralized protocol with no central authority controlling your data.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
