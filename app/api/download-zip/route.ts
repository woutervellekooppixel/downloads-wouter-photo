import archiver from "archiver";
import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import { PassThrough } from "stream";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return new Response("Slug is verplicht", { status: 400 });
  }

  const folderPath = path.join(process.cwd(), "public", "photos", slug);

  if (!fs.existsSync(folderPath)) {
    return new Response("Map niet gevonden", { status: 404 });
  }

  const files = fs.readdirSync(folderPath).filter((file) =>
    /\.(jpe?g|png|webp)$/i.test(file)
  );

  if (files.length === 0) {
    return new Response("Geen afbeeldingen gevonden", { status: 404 });
  }

  const zipStream = new PassThrough();
  const archive = archiver("zip", { zlib: { level: 9 } });

  archive.on("error", (err) => {
    console.error("Archiver error:", err);
    zipStream.end();
  });

  archive.pipe(zipStream);

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    archive.file(filePath, { name: file });
  }

  archive.finalize();

  return new Response(zipStream as any, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${slug}.zip"`,
    },
  });
}
