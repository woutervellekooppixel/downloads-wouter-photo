import fs from "fs";
import path from "path";

export function getFilesFromSlug(slug: string): string[] {
  const folderPath = path.join(process.cwd(), "public", "photos", slug);

  if (!fs.existsSync(folderPath)) {
    return [];
  }

  const files = fs
    .readdirSync(folderPath)
    .filter((file) => /\.(jpe?g|png|webp)$/i.test(file));

  return files;
}