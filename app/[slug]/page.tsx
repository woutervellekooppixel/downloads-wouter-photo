import fs from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Header from "../../components/Header";
import DownloadButton from "../../components/DownloadButton";

interface Params {
  slug: string;
}
interface Props {
  params: Params;
}

export async function generateMetadata(props: unknown): Promise<Metadata> {
  const { params } = props as Props;
  const { slug } = params;

  const formattedSlug = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c: string) => c.toUpperCase());

  return {
    title: `Downloads Wouter.Photo | ${formattedSlug}`,
    description: `Download alle bestanden van ${formattedSlug}`,
  };
}

export default async function Page(props: unknown) {
  const { params } = props as Props;
  const { slug } = params;

  // Detecteer of map in photos/ of files/ zit
  const basePhotos = path.join(process.cwd(), "public", "photos", slug);
  const baseFiles = path.join(process.cwd(), "public", "files", slug);

  const isPhotoGallery = await fs
    .stat(basePhotos)
    .then((stat) => stat.isDirectory())
    .catch(() => false);

  const folderPath = isPhotoGallery ? basePhotos : baseFiles;

  try {
    const dirents = await fs.readdir(folderPath, { withFileTypes: true });

    const folders = dirents.filter((d) => d.isDirectory());
    const files = dirents
      .filter((d) => d.isFile() && /\.(jpe?g|png|webp)$/i.test(d.name))
      .map((d) => d.name);

    let imageSections: { title: string; files: { name: string; path: string }[] }[] = [];

    if (isPhotoGallery) {
      imageSections = await Promise.all(
        folders.map(async (folder) => {
          const subPath = path.join(folderPath, folder.name);
          const subFiles = (await fs.readdir(subPath))
            .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
            .sort();

          return {
            title: folder.name.replace(/_/g, " "),
            files: subFiles.map((f) => ({
              name: f,
              path: `/photos/${slug}/${folder.name}/${f}`,
            })),
          };
        })
      );

      if (files.length > 0) {
        imageSections.unshift({
          title: "Alle foto's",
          files: files.map((f) => ({
            name: f,
            path: `/photos/${slug}/${f}`,
          })),
        });
      }

      const totalPhotos = imageSections.reduce((sum, sec) => sum + sec.files.length, 0);
      if (totalPhotos === 0) notFound();
    }

    return (
      <div className="min-h-screen">
        <Header />

        <section
          className="relative h-[60vh] sm:h-screen bg-cover bg-center"
          style={{ backgroundImage: `url('/background.jpg')` }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
            <DownloadButton slug={slug} />
            {isPhotoGallery && (
              <div className="mt-6 animate-bounce text-white text-sm opacity-80">
                ↓ Scroll voor alle foto's
              </div>
            )}
          </div>
          {isPhotoGallery && (
            <div className="hidden md:block absolute bottom-4 right-4 text-xs sm:text-sm text-white opacity-80 z-10">
              Lionel Richie photographed by Wouter Vellekoop
            </div>
          )}
        </section>

        {isPhotoGallery && (
          <section id="gallery" className="bg-white py-12 px-4">
            <div className="max-w-6xl mx-auto space-y-12">
              {imageSections.map((section) => (
                <div key={section.title}>
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    {section.title}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {section.files.map((file) => (
                      <div
                        key={file.path}
                        className="relative group overflow-hidden rounded shadow"
                      >
                        <Image
                          src={file.path}
                          alt={file.name}
                          width={800}
                          height={600}
                          className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                          <a
                            href={file.path}
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
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  } catch {
    notFound();
  }
}