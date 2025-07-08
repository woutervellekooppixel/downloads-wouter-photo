'use client'

import { motion } from 'framer-motion'

export default function DownloadButton({ slug }: { slug: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
      className="relative group"
    >
{/* Tooltip */}
<div
  className="absolute -top-20 left-1/2 -translate-x-1/2 z-20
             bg-white/80 text-black text-xs px-3 py-2 rounded shadow-lg backdrop-blur-sm
             transition-opacity duration-300
             opacity-100 group-hover:opacity-100"
>
  Download {slug}.zip

  {/* Tooltip arrow */}
  <div
    className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 
               rotate-45 bg-white/80 backdrop-blur-sm shadow-sm"
  ></div>
</div>

      {/* Downloadknop */}
      <a
        href={`/api/download-zip?slug=${slug}`}
        className="group relative w-30 h-30 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-105 shadow-lg shadow-white/10"
      >
        {/* Radar-border animatie die stopt op hover */}
        <div className="absolute inset-0 rounded-full border-t-4 border-white/60 opacity-80 group-hover:animate-none animate-spin-slow z-0" />

        {/* Simpele pijlpunt naar beneden */}
        <svg
          className="relative z-10 w-10 h-10 text-white transition-all duration-300 ease-in-out group-hover:scale-110"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </a>
    </motion.div>
  )
}