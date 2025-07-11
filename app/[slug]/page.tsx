import fs from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import dynamic from "next/dynamic"; // 👈 Belangrijk: bovenaan
import Header from "../../components/Header";
import DownloadButton from "../../components/DownloadButton";

// Dynamische import van de lightbox-gallery
const GallerySection = dynamic(() => import("../components/GallerySection"), {
  ssr: false,
});

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

  // 🔍 Check of hero.jpg aanwezig is
  const heroFullPath = path.join(folderPath, "hero.jpg");
  const hasHero = await fs
    .stat(heroFullPath)
    .then((s) => s.isFile())
    .catch(() => false);

  const heroUrl = hasHero ? `/photos/${slug}/hero.jpg` : "/background.jpg";

  try {
    const dirents = await fs.readdir(folderPath, { withFileTypes: true });

    const folders = dirents.filter((d) => d.isDirectory());
    const files = dirents
      .filter(
        (d) =>
          d.isFile() &&
          /\.(jpe?g|png|webp)$/i.test(d.name) &&
          d.name !== "hero.jpg" // ⛔️ exclude hero.jpg
      )
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
          style={{ backgroundImage: `url('${heroUrl}')` }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
            <DownloadButton slug={slug} />
            {isPhotoGallery && (
              <div className="mt-6 animate-bounce text-white text-sm opacity-80">
                ↓ Scroll voor alle foto&#39;s
              </div>
            )}
          </div>
          <div className="hidden md:block absolute bottom-4 right-4 text-xs sm:text-sm text-white opacity-80 z-10">
            Lionel Richie photographed by Wouter Vellekoop
          </div>
        </section>

        {isPhotoGallery && (
          <section id="gallery" className="bg-white py-12 px-4">
            <div className="max-w-6xl mx-auto space-y-12">
              {imageSections.map((section) => (
                <GallerySection
                  key={section.title}
                  title={section.title}
                  files={section.files}
                />
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