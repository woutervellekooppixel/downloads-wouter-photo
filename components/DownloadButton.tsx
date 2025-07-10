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
  href={`/zips/${slug}.zip`}
  download
  className="relative z-10 bg-white text-black rounded-full px-6 py-3 text-lg shadow hover:bg-gray-200 transition"
>
  {/* Sonar-animatie cirkel */}
  <span className="absolute inset-0 rounded-full bg-black/10 animate-ping-custom z-0" />

  {/* Witte rand die pulseert */}
  <div className="absolute inset-0 rounded-full border border-white/40 animate-pulse-slow z-0" />

  {/* Icoon */}
  <svg
    className="relative z-10 w-10 h-10 text-black transition-all duration-300 ease-in-out group-hover:scale-110"
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
