'use client'

import { useState } from 'react'
import { FaBars, FaTimes, FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa'

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="text-black">
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-t border-gray-200 shadow-md z-50">
          <nav className="flex flex-col p-4 space-y-2 text-sm">
            <a href="https://www.wouter.photo/portfolio/concerts" className="hover:text-gray-600">Concerts</a>
            <a href="https://www.wouter.photo/portfolio/events" className="hover:text-gray-600">Events</a>
            <a href="https://www.wouter.photo/portfolio/misc" className="hover:text-gray-600">Misc</a>
            <a href="https://www.wouter.photo/about" className="hover:text-gray-600">About</a>
            <div className="flex space-x-4 pt-2">
              <a href="https://instagram.com/woutervellekoop" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600"><FaInstagram size={16} /></a>
              <a href="https://linkedin.com/in/woutervellekoop" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600"><FaLinkedin size={16} /></a>
              <a href="mailto:hello@wouter.photo" className="text-black hover:text-gray-600"><FaEnvelope size={16} /></a>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}