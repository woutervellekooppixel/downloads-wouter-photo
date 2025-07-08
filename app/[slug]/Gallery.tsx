'use client';

export default function Gallery({
  slug,
  files,
}: {
  slug: string;
  files: string[];
}) {
  return (
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
  );
}