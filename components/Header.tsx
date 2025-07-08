'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import type { HTMLAttributes } from 'react'

const MotionSpan = motion(function MotionSpanBase({
  className,
  style,
  ...rest
}: HTMLAttributes<HTMLSpanElement>) {
  return <span className={className} style={style} {...rest} />
})

export default function Header() {
  const pathname = usePathname()

  let suffix = 'PHOTO'
  if (pathname.includes('concert')) suffix = 'CONCERTS'
  else if (pathname.includes('event')) suffix = 'EVENTS'
  else if (pathname.includes('misc')) suffix = 'MISC'

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
      <a href="https://www.wouter.photo" className="text-xl tracking-tight text-black flex items-baseline gap-1">
        <span className="font-extrabold">WOUTER</span>
        <AnimatePresence mode="wait">
          <MotionSpan
            key={suffix}
            className="font-light inline-block"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            .{suffix}
          </MotionSpan>
        </AnimatePresence>
      </a>

      <nav className="hidden sm:flex items-center space-x-6 text-sm text-black">
        <div className="relative group">
          <div className="font-medium hover:text-black cursor-pointer">Portfolio</div>
          <div className="absolute left-0 top-full pt-1 z-50">
            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-200 bg-white shadow-md rounded border border-gray-200 min-w-[140px] space-y-1 py-1 px-2">
              <a href="https://www.wouter.photo/portfolio/concerts" className="block text-sm py-1">Concerts</a>
              <a href="https://www.wouter.photo/portfolio/events" className="block text-sm py-1">Events</a>
              <a href="https://www.wouter.photo/portfolio/misc" className="block text-sm py-1">Misc</a>
            </div>
          </div>
        </div>

        <a href="https://www.wouter.photo/about" className="hover:text-gray-600">About</a>
        <a href="https://instagram.com/woutervellekoop" target="_blank" className="hover:text-gray-600"><FaInstagram size={16} /></a>
        <a href="https://linkedin.com/in/woutervellekoop" target="_blank" className="hover:text-gray-600"><FaLinkedin size={16} /></a>
        <a href="mailto:hello@wouter.photo" className="hover:text-gray-600"><FaEnvelope size={16} /></a>
      </nav>

      {/* Mobiele versie — optioneel toevoegen later */}
      {/* <div className="sm:hidden"><MobileMenu /></div> */}
    </header>
  )
}