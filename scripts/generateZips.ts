// scripts/generate-zips.ts

import fs from "fs/promises";
import path from "path";
import { createWriteStream, existsSync } from "fs";
import archiver from "archiver";

const photosDir = path.join(process.cwd(), "public", "photos");
const zipOutputDir = path.join(process.cwd(), "public", "zips");

async function run() {
  await fs.mkdir(zipOutputDir, { recursive: true });

  const folders = await fs.readdir(photosDir);
  const existingZips = await fs.readdir(zipOutputDir);

  const validFolders = [];

  for (const folder of folders) {
    const folderPath = path.join(photosDir, folder);

    // Check of het echt een directory is
    let stats;
    try {
      stats = await fs.stat(folderPath);
      if (!stats.isDirectory()) continue;
    } catch {
      continue;
    }

    // Check of de folder niet leeg is
    const files = await fs.readdir(folderPath).catch(() => []);
    if (files.length === 0) continue;

    validFolders.push(folder);
    const zipPath = path.join(zipOutputDir, `${folder}.zip`);
    if (existsSync(zipPath)) continue; // skip als ZIP al bestaat

    // Maak ZIP aan
    console.log(`📦 Zipping: ${folder}`);
    const output = createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    archive.on("error", (err) => console.error(`❌ Archiver error for ${folder}:`, err));
    archive.pipe(output);
    archive.directory(folderPath, false);
    await archive.finalize();
  }

  // Opruimen: verwijder zips van mappen die niet meer bestaan
  for (const zipFile of existingZips) {
    const folderName = zipFile.replace(/\.zip$/, "");
    if (!validFolders.includes(folderName)) {
      console.log(`🗑️ Verwijder ZIP: ${zipFile}`);
      await fs.unlink(path.join(zipOutputDir, zipFile));
    }
  }

  console.log("✅ ZIP-synchronisatie voltooid");
}

run();