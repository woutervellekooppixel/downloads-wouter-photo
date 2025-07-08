/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Header from '../../components/Header';
import DownloadButton from '../../components/DownloadButton';

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
      <Header />

      <section
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: `url('/background.jpg')` }}
      >
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <DownloadButton slug={slug} />


        </div>

        <div className="absolute bottom-4 right-4 text-xs sm:text-sm text-white opacity-80 z-20">
          Lionel Richie photographed by Wouter Vellekoop
        </div>
      </section>

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
