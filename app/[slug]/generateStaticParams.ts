// app/[slug]/generateStaticParams.ts
import fs from "fs";
import path from "path";

export async function generateStaticParams() {
  const photosDir = path.join(process.cwd(), "public", "photos");

  if (!fs.existsSync(photosDir)) return [];

  const folders = fs
    .readdirSync(photosDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => ({ slug: entry.name }));

  return folders;
}