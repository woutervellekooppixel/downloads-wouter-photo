import fs from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `${params.slug} – downloads by Wouter Vellekoop`,
  };
}

export default async function Page({ params }: PageProps) {
  const slug = params.slug;
  const folderPath = path.join(process.cwd(), "public", "photos", slug);

  try {
    await fs.access(folderPath);
  } catch {
    notFound();
  }

  const files = (await fs.readdir(folderPath)).filter((file) =>
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
          {/* Animated Border with Counter */}
          <div className="relative w-40 h-40 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 rounded-full border-[6px] border-white animate-spin-slow" />
            <div className="absolute text-lg font-semibold animate-count">100%</div>
            <a
              href={`/api/download-zip?slug=${slug}`}
              className="absolute z-10 inset-0 flex items-center justify-center text-white px-10 py-3 rounded-full transition"
            >
              Download
            </a>
          </div>

          <div className="mt-16 flex flex-col items-center animate-bounce">
            <a href="#gallery" className="text-white text-4xl">↓</a>
            <p className="text-sm mt-2">Klik hier voor alle thumbnails</p>
          </div>
        </div>

        {/* Onderschrift rechtsonder */}
        <div className="absolute bottom-4 right-4 text-xs sm:text-sm text-white">
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

      {/* Extra styling for counter animation */}
      <style jsx>{`
        @keyframes countUp {
          0% {
            content: "0%";
          }
          100% {
            content: "100%";
          }
        }

        .animate-count::before {
          content: "100%";
          animation: countUp 2s ease-out forwards;
        }

        .animate-spin-slow {
          animation: spin 10s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}