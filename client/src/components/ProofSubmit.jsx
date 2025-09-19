
import React from 'react'

export default function ProofSubmit() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-brand-neon">Submit Location Proof</h2>
        <div className="bg-brand-800/50 p-8 rounded-lg border border-brand-neon/20">
          <p className="text-gray-300 text-center mb-8">
            Verify your location and earn VFYZ tokens for proof-of-presence
          </p>
          <div className="max-w-md mx-auto space-y-4">
            <input
              type="text"
              placeholder="Latitude"
              className="w-full p-3 bg-brand-700 text-white rounded border border-brand-neon/20"
            />
            <input
              type="text"
              placeholder="Longitude"
              className="w-full p-3 bg-brand-700 text-white rounded border border-brand-neon/20"
            />
            <button className="w-full bg-brand-neon text-brand-900 py-3 rounded font-bold hover:bg-brand-neon/90 transition-colors">
              Submit Proof
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
