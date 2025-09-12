
import { useEffect, useState } from 'react'

export default function Countdown(){
  const START = Number(import.meta.env.VITE_PRESALE_START || 0)
  const END = Number(import.meta.env.VITE_PRESALE_END || 0)
  const [now, setNow] = useState(Math.floor(Date.now()/1000))
  useEffect(() => { const t = setInterval(() => setNow(Math.floor(Date.now()/1000)), 1000); return () => clearInterval(t) }, [])
  const fmt = (s)=>{ const d=Math.floor(s/86400), h=Math.floor((s%86400)/3600), m=Math.floor((s%3600)/60), sec=s%60; return `${d}d ${h}h ${m}m ${sec}s` }
  if (!START || !END) return null
  if (now < START) return <div className="text-white/80">Presale starts in {fmt(START-now)}</div>
  if (now <= END)  return <div className="text-white/80">Presale ends in {fmt(END-now)}</div>
  return <div className="text-white/80">Presale ended</div>
}
