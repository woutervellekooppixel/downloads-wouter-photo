import fs from "fs";
import path from "path";

export async function generateStaticParams() {
  const basePath = path.join(process.cwd(), "public", "photos");
  if (!fs.existsSync(basePath)) return [];

  const folders = fs.readdirSync(basePath, { withFileTypes: true });
  return folders
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => ({
      slug: dirent.name,
    }));
}