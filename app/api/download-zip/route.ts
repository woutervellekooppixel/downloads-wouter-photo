import path from "path";
import fs from "fs";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return new Response("Slug is verplicht", { status: 400 });
  }

  const zipPath = path.join(process.cwd(), "public", "zips", `${slug}.zip`);

  if (!fs.existsSync(zipPath)) {
    return new Response("ZIP-bestand niet gevonden", { status: 404 });
  }

  const fileBuffer = fs.readFileSync(zipPath);

  return new Response(fileBuffer, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${slug}.zip"`,
    },
  });
}