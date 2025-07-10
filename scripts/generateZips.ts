import fs from "fs/promises";
import path from "path";
import archiver from "archiver";
import { createWriteStream, existsSync } from "fs";

async function generateZips() {
  const photosDir = path.join(process.cwd(), "public", "photos");
  const zipOutputDir = path.join(process.cwd(), "public", "zips");

  await fs.mkdir(zipOutputDir, { recursive: true });
  const folders = await fs.readdir(photosDir);

  for (const folder of folders) {
    const folderPath = path.join(photosDir, folder);
    const stats = await fs.stat(folderPath);
    if (!stats.isDirectory()) continue;

    const zipPath = path.join(zipOutputDir, `${folder}.zip`);
    if (existsSync(zipPath)) {
      console.log(`❌ Zip bestaat al: ${folder}.zip`);
      continue;
    }

    console.log(`📦 Zipping: ${folder}`);
    const output = createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    archive.on("error", (err) => {
      console.error(`❌ Fout bij zippen van ${folder}:`, err);
    });

    archive.pipe(output);
    archive.directory(folderPath, false); // hele map, zonder submap in zip
    await archive.finalize();
  }

  console.log("✅ Alle zips aangemaakt!");
}

generateZips();