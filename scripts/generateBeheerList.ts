// scripts/generateBeheerList.ts
import path from "path";
import { promises as fs } from "fs";

const SOURCES = [
  { label: "📷 Photos", dir: "photos" },
  { label: "📎 Files", dir: "files" },
];

async function run() {
  const allSlugs: {
    type: string;
    slug: string;
    mtime: string | null;
  }[] = [];

  for (const base of SOURCES) {
    const folderPath = path.join(process.cwd(), "public", base.dir);
    try {
      const entries = await fs.readdir(folderPath, { withFileTypes: true });
      for (const entry of entries) {
        if (!entry.isDirectory()) continue;
        const fullPath = path.join(folderPath, entry.name);
        const stat = await fs.stat(fullPath);
        allSlugs.push({
          type: base.label,
          slug: entry.name,
          mtime: stat.mtime?.toISOString() ?? null,
        });
      }
    } catch {
      // map bestaat niet, negeren
    }
  }

  allSlugs.sort(
    (a, b) => a.type.localeCompare(b.type) || a.slug.localeCompare(b.slug)
  );

  const outputPath = path.join(process.cwd(), "data", "beheer.json");
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify(allSlugs, null, 2), "utf-8");
  console.log("✅ Beheer data opgeslagen");
}

run();