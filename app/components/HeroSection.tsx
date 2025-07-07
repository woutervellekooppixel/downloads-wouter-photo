'use client';
import LogoTilt from './LogoTilt';

export default function HeroSection() {
  return (
    <section
      className="h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url('/background.jpg')` }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <LogoTilt />
        <div className="mt-16 flex flex-col items-center animate-bounce">
          <a href="#gallery" className="text-white text-4xl">↓</a>
          <p className="text-sm mt-2">Klik hier voor alle thumbnails</p>
        </div>
      </div>
    </section>
  );
}
