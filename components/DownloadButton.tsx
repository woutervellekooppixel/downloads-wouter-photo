'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function DownloadButton({ slug }: { slug: string }) {
  const [showTooltip, setShowTooltip] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
      className="relative flex flex-col items-center group"
    >
{/* Tooltip */}
<div
  className={`absolute -top-16 left-1/2 -translate-x-1/2 z-20
              bg-white/90 text-black text-sm px-4 py-2 rounded-md shadow-lg backdrop-blur-md
              transition-opacity duration-300 whitespace-nowrap
              ${showTooltip ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
>
  Download {slug}.zip
  <div
    className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 
               rotate-45 bg-white/90 backdrop-blur-md shadow-sm"
  />
</div>

      {/* Downloadknop */}
      <a
  href={`/zips/${slug}.zip`} // ↩️ rechtstreeks naar het gegenereerde zipbestand
  download
  className="group relative w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-105 shadow-xl border border-white/30"
>
        <div className="absolute inset-0 rounded-full border border-white/40 animate-pulse-slow z-0" />
        <svg
          className="relative z-10 w-10 h-10 text-white transition-all duration-300 ease-in-out group-hover:scale-110"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </a>
    </motion.div>
  )
}
