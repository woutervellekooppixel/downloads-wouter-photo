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
          <h1 className="text-4xl font-bold mb-4">Download foto's</h1>
          <a
            href={`/api/download-zip?slug=${slug}`}
            className="bg-white text-black px-6 py-3 rounded shadow hover:bg-gray-100 transition"
          >
            Download alles als ZIP
          </a>
          <div className="mt-10 animate-bounce">
            <a href="#gallery" className="text-white text-2xl">↓</a>
            <p className="text-sm mt-1">Klik hier voor alle thumbnails</p>
          </div>
        </div>
      </section>

      {/* Gallery section */}
      <section id="gallery" className="bg-white py-12 px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {files.map((file) => (
            <div key={file} className="border rounded overflow-hidden">
              <img
                src={`/photos/${slug}/${file}`}
                alt={file}
                className="w-full h-auto"
              />
              <a
                href={`/photos/${slug}/${file}`}
                download
                className="block text-center py-2 text-sm bg-black text-white hover:bg-gray-800"
              >
                Download
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
