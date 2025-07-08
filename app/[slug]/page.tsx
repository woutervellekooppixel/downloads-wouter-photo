import { notFound } from "next/navigation";
import { getFilesFromSlug } from "@/lib/getFilesFromSlug";
import Hero from "./Hero"; // client component
import Gallery from "./Gallery"; // client component

export default function Page({ params }: { params: { slug: string } }) {
  const files = getFilesFromSlug(params.slug);

  if (!files || files.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Hero slug={params.slug} />
      <Gallery slug={params.slug} files={files} />
    </div>
  );
}