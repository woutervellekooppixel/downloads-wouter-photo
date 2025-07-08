/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Header from '../../components/Header';

export default function Page(props: any) {
  const slug = props.params.slug;
  const folderPath = path.join(process.cwd(), "public", "photos", slug);

  if (!fs.existsSync(folderPath)) {
    notFound();
  }

  const files = fs.readdirSync(folderPath).filter((file) =>
    /\.(jpe?g|png|webp)$/i.test(file)
  );

  if (files.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Header /> {/* ✅ Zet hier de header */}

      {/* Hero section */}
      <section
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: `url('/background.jpg')` }}
      >
        {/* Donkere overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Inhoud */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          {/* Grote downloadknop */}
<div className="relative group">
  {/* Tooltip ballon */}
  <div className="absolute -top-20 left-1/2 -translate-x-1/2 z-20 transition-opacity duration-300 ease-out 
                  bg-white text-black text-xs px-3 py-2 rounded shadow-lg 
                  opacity-100 group-hover:opacity-100 pointer-events-none
                  animate-fade-out"
       style={{ animationDelay: '2.5s', animationFillMode: 'forwards' }}
  >
    Download {slug}.zip
    <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 shadow -z-10" />
  </div>

  {/* Downloadknop zelf */}
  <a
    href={`/api/download-zip?slug=${slug}`}
    className="group relative w-40 h-40 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-105 shadow-lg shadow-white/10"
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
</div>

          {/* Scroll prompt */}
          <div className="mt-16 flex flex-col items-center animate-bounce">
            <a href="#gallery" className="text-white text-4xl">↓</a>
            <p className="text-sm mt-2 text-white/70">Bekijk losse fotos</p>
          </div>
        </div>

        {/* Fotocredit */}
        <div className="absolute bottom-4 right-4 text-xs sm:text-sm text-white opacity-80">
          Lionel Richie photographed by Wouter Vellekoop
        </div>
      </section>

      {/* Gallery sectie */}
      <section id="gallery" className="bg-white py-12 px-4">
        <p className="text-center text-gray-600 text-sm mb-6">
          Of download losse fotos hieronder ⬇
        </p>

        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {files.map((file) => (
            <div key={file} className="relative group overflow-hidden rounded shadow">
              <img
                src={`/photos/${slug}/${file}`}
                alt={file}
                className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                <a
                  href={`/photos/${slug}/${file}`}
                  download
                  title="Download deze foto"
                  className="bg-white text-black rounded-full px-4 py-2 text-sm shadow hover:bg-gray-200 transition"
                >
                  ⬇
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}