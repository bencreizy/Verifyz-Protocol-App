
import React from 'react'

export default function Timeline() {
  return (
    <section id="timeline" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-brand-neon">Roadmap</h2>
        <div className="space-y-8">
          <div className="flex items-center space-x-4">
            <div className="w-4 h-4 bg-brand-neon rounded-full"></div>
            <div>
              <h3 className="text-xl font-bold text-white">Q1 2024 - Presale Launch</h3>
              <p className="text-gray-300">Initial token presale and community building</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-4 h-4 bg-brand-neon rounded-full"></div>
            <div>
              <h3 className="text-xl font-bold text-white">Q2 2024 - Protocol Development</h3>
              <p className="text-gray-300">Core verification algorithms and smart contracts</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
            <div>
              <h3 className="text-xl font-bold text-gray-400">Q3 2024 - Beta Testing</h3>
              <p className="text-gray-400">Closed beta with select partners</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
