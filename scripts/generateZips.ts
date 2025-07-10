// scripts/generate-zips.ts

import fs from "fs/promises";
import path from "path";
import { createWriteStream, existsSync } from "fs";
import archiver from "archiver";

// ✅ De hoofdbronnen die we willen verwerken
const SOURCES = ["photos", "files"] as const;

const zipOutputDir = path.join(process.cwd(), "public", "zips");

async function run() {
  await fs.mkdir(zipOutputDir, { recursive: true });

  const validFolders: string[] = [];
  const existingZips = await fs.readdir(zipOutputDir);

  for (const source of SOURCES) {
    const sourceDir = path.join(process.cwd(), "public", source);

    // Sla over als de map niet bestaat
    if (!existsSync(sourceDir)) continue;

    const folders = await fs.readdir(sourceDir);

    for (const folder of folders) {
      const folderPath = path.join(sourceDir, folder);

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

      const zipFileName = `${folder}.zip`;
      validFolders.push(zipFileName);

      const zipPath = path.join(zipOutputDir, zipFileName);
      if (existsSync(zipPath)) continue; // Skip als ZIP al bestaat

      // Maak ZIP aan
      console.log(`📦 Zipping: ${source}/${folder}`);
      const output = createWriteStream(zipPath);
      const archive = archiver("zip", { zlib: { level: 9 } });

      archive.on("error", (err) =>
        console.error(`❌ Archiver error for ${folder}:`, err)
      );
      archive.pipe(output);
      archive.directory(folderPath, false);
      await archive.finalize();
    }
  }

  // Opruimen: verwijder ZIPs van mappen die niet meer bestaan
  for (const zipFile of existingZips) {
    if (!validFolders.includes(zipFile)) {
      console.log(`🗑️ Verwijder ZIP: ${zipFile}`);
      await fs.unlink(path.join(zipOutputDir, zipFile));
    }
  }

  console.log("✅ ZIP-synchronisatie voltooid");
}

run();