import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import HeroSection from "../components/HeroSection";
import Image from "next/image";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function Page({ params }: PageProps) {
  const slug = params.slug;
  const folderPath = path.join(process.cwd(), "public", "photos", slug);

  if (!fs.existsSync(folderPath)) {
    notFound();
  }

  const files = fs
    .readdirSync(folderPath)
    .filter((file) => /\.(jpe?g|png|webp)$/i.test(file));

  if (files.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <HeroSection slug={slug} />
      <section id="gallery" className="bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {files.map((file) => (
            <div
              key={file}
              className="relative group overflow-hidden rounded shadow"
            >
              <Image
                src={`/photos/${slug}/${file}`}
                alt={file}
                width={800}
                height={600}
                className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-80 sm:opacity-0 sm:group-hover:opacity-80 transition duration-300 flex items-center justify-center">
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

export async function generateStaticParams() {
  const dirPath = path.join(process.cwd(), "public", "photos");

  if (!fs.existsSync(dirPath)) return [];

  const folders = fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => ({ slug: entry.name }));

  return folders;
}