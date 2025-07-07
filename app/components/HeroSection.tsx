'use client';
import { useEffect, useState } from 'react';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const [showBalloon, setShowBalloon] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowBalloon(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url('/background.jpg')` }}
    >
      <div className="absolute inset-0 bg-black/40" />

      {/* Ballon */}
      {showBalloon && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white px-4 py-2 rounded-full shadow-lg animate-bounce z-10">
          Click to Download
        </div>
      )}

      {/* Cirkel met downloadknop */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <div className="w-64 h-64 rounded-full bg-white/70 backdrop-blur-md flex items-center justify-center">
          <a
            href="#gallery"
            className={`${styles.downloadButton} text-white text-xl font-semibold px-6 py-3 rounded-full`}
          >
            ⬇ Download
          </a>
        </div>

        {/* Pijl en tekst */}
        <div className="mt-16 flex flex-col items-center animate-bounce">
          <a href="#gallery" className="text-white text-4xl">↓</a>
          <p className="text-sm mt-2">Klik hier voor alle thumbnails</p>
        </div>
      </div>
    </section>
  );
}
