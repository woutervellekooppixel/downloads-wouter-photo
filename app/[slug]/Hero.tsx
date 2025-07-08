'use client';
import { useState, useEffect } from 'react';

export default function Hero({ slug }: { slug: string }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => setShowTooltip(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showTooltip]);

  return (
    <section
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/background.jpg')` }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <div className="relative">
          <a
            href={`/api/download-zip?slug=${slug}`}
            className={`group relative w-40 h-40 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-105 shadow-lg shadow-white/10 ${
              clicked ? 'animate-bounce' : ''
            }`}
            onClick={() => {
              setShowTooltip(true);
              setClicked(true);
              setTimeout(() => setClicked(false), 600);
            }}
          >
            <div className="absolute inset-0 rounded-full border-4 border-white/60 group-hover:border-white transition-all duration-700 animate-pulse-slow" />
            <svg
              className="relative z-10 w-20 h-20 text-white transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:opacity-100 opacity-90"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v6m0 0l-3-3m3 3l3-3m0-10H9"
              />
            </svg>
          </a>
          {showTooltip && (
            <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 bg-white text-black text-xs px-3 py-2 rounded-full shadow transition-opacity duration-300">
              Download {slug}.zip
            </div>
          )}
        </div>
        <div className="mt-16 flex flex-col items-center animate-bounce">
          <a href="#gallery" className="text-white text-4xl">↓</a>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 text-xs sm:text-sm text-white opacity-80">
        Lionel Richie photographed by Wouter Vellekoop
      </div>
    </section>
  );
}