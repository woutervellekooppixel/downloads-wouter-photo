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
        className="h-screen bg-cover bg-center relative"
        style={{ backgroundImage: `url('/background.jpg')` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <div className="w-40 h-40 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center animate-pulse">
            <a
              href={`/api/download-zip?slug=${slug}`}
              className="text-white bg-black/80 px-6 py-3 rounded-full hover:bg-black transition"
            >
              Download
            </a>
          </div>
          <div className="mt-10 animate-bounce">
            <a href="#gallery" className="text-white text-2xl">↓</a>
            <p className="text-sm mt-1">Klik hier voor alle thumbnails</p>
          </div>
        </div>
      </section>

      {/* Gallery section */}
      <section id="gallery" className="bg-white py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
