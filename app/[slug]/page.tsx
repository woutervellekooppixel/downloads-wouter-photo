/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";

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
      {/* Hero section */}
<section
  className="relative h-screen bg-cover bg-center"
  style={{ backgroundImage: `url('/background.jpg')` }}
>
  {/* Donkere overlay */}
  <div className="absolute inset-0 bg-black/40" />

  {/* Inhoud in het midden */}
  <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
    
    {/* Klikbaar download-rondje */}
<a
  href={`/api/download-zip?slug=${slug}`}
  className="group relative w-40 h-40 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center overflow-hidden transition-transform hover:scale-105"
>
  <div className="absolute inset-0 border-4 border-white rounded-full animate-spin-slow group-hover:brightness-110" />
  <svg
    className="relative z-10 w-12 h-12 text-white"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v6m0 0l-3-3m3 3l3-3m0-10H9" />
  </svg>
</a>

    {/* Scroll-down prompt */}
    <div className="mt-16 flex flex-col items-center animate-bounce">
      <a href="#gallery" className="text-white text-4xl">↓</a>
      <p className="text-sm mt-2">Klik hier voor alle thumbnails</p>
    </div>
  </div>

  {/* Fotocredit */}
  <div className="absolute bottom-4 right-4 text-xs sm:text-sm text-white opacity-80">
    Lionel Richie photographed by Wouter Vellekoop
  </div>
</section>

      {/* Gallery section */}
      <section id="gallery" className="bg-white py-12 px-4">
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
