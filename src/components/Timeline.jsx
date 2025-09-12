
const steps = [
  { n: 1, title: "Event Creation", text: "Organizer posts eventId, geofence & time window on-chain." },
  { n: 2, title: "User Check-In", text: "Scan QR / tap NFC at venue. Challenge includes nonce & expiry." },
  { n: 3, title: "Proof Generation", text: "Device collects GPS + attestation & creates ZK proof." },
  { n: 4, title: "Proof Submission", text: "Submit proof & nullifier to Verifier contract." },
  { n: 5, title: "Reward Settlement", text: "Escrow pays tokens & logs presence receipt." }
]

export default function Timeline() {
  return (
    <section className="section py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.slice(0,4).map(s => (
          <div key={s.n} className="card-neon p-6">
            <h3 className="font-bold">{s.n}. {s.title}</h3>
            <p className="text-white/75 mt-2 text-sm">{s.text}</p>
          </div>
        ))}
        <div className="card-neon p-6 md:col-span-3">
          <h3 className="font-bold">{steps[4].n}. {steps[4].title}</h3>
          <p className="text-white/75 mt-2 text-sm">{steps[4].text}</p>
        </div>
      </div>
    </section>
  )
}
