import fs from 'fs';
import path from 'path';

export function getPhotos(slug: string): string[] | null {
  const folderPath = path.join(process.cwd(), 'public', 'photos', slug);

  if (!fs.existsSync(folderPath)) {
    return null;
  }

  const files = fs.readdirSync(folderPath).filter((file) =>
    /\.(jpe?g|png|webp)$/i.test(file)
  );

  return files.length > 0 ? files : null;
}
