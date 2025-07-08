import { notFound } from 'next/navigation';
import { getPhotos } from '../../lib/getPhotos';

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const files = await getPhotos(slug);

  if (!files) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: `url('/background.jpg')` }}
      >
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <div className="relative">
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

          <div className="mt-16 flex flex-col items-center animate-bounce">
            <a href="#gallery" className="text-white text-4xl">
              ↓
            </a>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 text-xs sm:text-sm text-white opacity-80">
          Lionel Richie photographed by Wouter Vellekoop
        </div>
      </section>

      {/* Gallery section */}
      <section id="gallery" className="bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {files.map((file) => (
            <div
              key={file}
              className="relative group overflow-hidden rounded shadow"
            >
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
