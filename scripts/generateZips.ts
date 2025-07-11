import fs from "fs/promises";
import path from "path";
import { createWriteStream, existsSync } from "fs";
import archiver from "archiver";

const SOURCES = ["photos", "files"] as const;
const zipOutputDir = path.join(process.cwd(), "public", "zips");

async function run() {
  await fs.mkdir(zipOutputDir, { recursive: true });

  const validFolders: string[] = [];
  const existingZips = await fs.readdir(zipOutputDir);

  for (const source of SOURCES) {
    const sourceDir = path.join(process.cwd(), "public", source);
    if (!existsSync(sourceDir)) continue;

    const folders = await fs.readdir(sourceDir);

    for (const folder of folders) {
      const folderPath = path.join(sourceDir, folder);
      const stats = await fs.stat(folderPath).catch(() => null);
      if (!stats || !stats.isDirectory()) continue;

      const files = await fs.readdir(folderPath).catch(() => []);
      if (files.length === 0) continue;

      const zipFileName = `${folder}.zip`;
      validFolders.push(zipFileName);

      const zipPath = path.join(zipOutputDir, zipFileName);
      if (existsSync(zipPath)) continue;

      console.log(`📦 Zipping: ${source}/${folder}`);
      const output = createWriteStream(zipPath);
      const archive = archiver("zip", { zlib: { level: 9 } });

      archive.on("error", (err) =>
        console.error(`❌ Archiver error for ${folder}:`, err)
      );
      archive.pipe(output);

      // Voeg bestanden toe behalve hero.jpg
      for (const file of files) {
        if (file.toLowerCase() === "hero.jpg") continue;
        const filePath = path.join(folderPath, file);
        archive.file(filePath, { name: file });
      }

      await archive.finalize();
    }
  }

  for (const zipFile of existingZips) {
    if (!validFolders.includes(zipFile)) {
      console.log(`🗑️ Verwijder ZIP: ${zipFile}`);
      await fs.unlink(path.join(zipOutputDir, zipFile));
    }
  }

  console.log("✅ ZIP-synchronisatie voltooid");
}

run();