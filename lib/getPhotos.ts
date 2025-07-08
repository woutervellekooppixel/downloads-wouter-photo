import fs from 'fs/promises';
import path from 'path';

export async function getPhotos(slug: string): Promise<string[] | null> {
  const folderPath = path.join(process.cwd(), 'public', 'photos', slug);

  try {
    const files = await fs.readdir(folderPath);
    const imageFiles = files.filter((file) =>
      /\.(jpe?g|png|webp)$/i.test(file)
    );
    return imageFiles.length > 0 ? imageFiles : null;
  } catch (error) {
    return null;
  }
}
