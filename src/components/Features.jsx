
const features = [
  { title: "Anonymous Verification", text: "Verify without exposing your identity." },
  { title: "True Proof of Presence", text: "GPS, QR/NFC, and device signals make spoofing impossible." },
  { title: "Trust on Chain", text: "Every presence is recorded immutably on blockchain." },
  { title: "Unlimited Tokens", text: "Scalable rewards, limitless adoption." }
]

export default function Features() {
  return (
    <section className="section py-10 grid md:grid-cols-4 gap-5">
      {features.map((f, i) => (
        <div key={i} className="card-neon p-5">
          <h3 className="text-lg mb-2">{f.title}</h3>
          <p className="text-white/75 text-sm">{f.text}</p>
        </div>
      ))}
    </section>
  )
}
