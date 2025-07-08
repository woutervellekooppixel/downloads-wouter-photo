'use client'

import { useEffect } from 'react'

export default function DownloadButton({ slug }: { slug: string }) {
  useEffect(() => {
    const el = document.getElementById('tooltip')
    if (!el) return
    el.classList.add('tooltip-visible')
    const timeout = setTimeout(() => {
      el.classList.remove('tooltip-visible')
    }, 3000)
    return () => clearTimeout(timeout)
  }, [])

  const handleMouseEnter = () => {
    const el = document.getElementById('tooltip')
    el?.classList.add('tooltip-visible')
  }

  const handleMouseLeave = () => {
    const el = document.getElementById('tooltip')
    el?.classList.remove('tooltip-visible')
  }

  return (
    <div className="relative group">
      {/* Tooltip ballon */}
<div
  id="tooltip"
  className="absolute -top-20 left-1/2 -translate-x-1/2 z-20
             bg-white/90 text-black text-xs px-3 py-2 rounded shadow-lg
             opacity-0 transition-opacity duration-500 ease-in-out pointer-events-none
             tooltip group-hover:opacity-100 tooltip-visible"
>
  Download {slug}.zip
  <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white/90 rotate-45 shadow -z-10" />
</div>

      {/* Knop zelf */}
      <a
        href={`/api/download-zip?slug=${slug}`}
        className="group relative w-40 h-40 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-105 shadow-lg shadow-white/10"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="absolute inset-0 rounded-full border-4 border-white/60 group-hover:border-white transition-all duration-700 animate-pulse-slow" />
<svg
  xmlns="http://www.w3.org/2000/svg"
  className="relative z-10 w-20 h-20 text-white transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:opacity-100 opacity-90"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  strokeWidth={2}
>
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-5-5m5 5l5-5M5 20h14" />
</svg>
      </a>
    </div>
  )
}