
import React from 'react'

export default function Presale() {
  return (
    <section id="presale" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-brand-neon">Token Presale</h2>
        <div className="bg-brand-800/50 p-8 rounded-lg border border-brand-neon/20">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">VFYZ Token</h3>
              <p className="text-gray-300 mb-6">
                Get early access to VFYZ tokens at presale prices. Limited supply available.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-300">Presale Price:</span>
                  <span className="text-brand-neon font-bold">$0.10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Launch Price:</span>
                  <span className="text-white">$0.25</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Tokens Sold:</span>
                  <span className="text-brand-neon">2.5M / 10M</span>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-brand-900/50 p-6 rounded-lg">
                <h4 className="text-lg font-bold mb-4 text-white">Purchase Tokens</h4>
                <input
                  type="number"
                  placeholder="Amount (ETH)"
                  className="w-full p-3 bg-brand-700 text-white rounded border border-brand-neon/20 mb-4"
                />
                <button className="w-full bg-brand-neon text-brand-900 py-3 rounded font-bold hover:bg-brand-neon/90 transition-colors">
                  Connect Wallet
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
