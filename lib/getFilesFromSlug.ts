import fs from "fs/promises";
import path from "path";

export async function getFilesFromSlug(slug: string): Promise<string[]> {
  const folderPath = path.join(process.cwd(), "public", "photos", slug);

  try {
    const files = await fs.readdir(folderPath);
    return files.filter((file) => /\.(jpe?g|png|webp)$/i.test(file));
  } catch (error) {
    return [];
  }
}