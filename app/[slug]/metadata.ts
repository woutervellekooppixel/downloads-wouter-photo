import fs from "fs";
import path from "path";
import type { Metadata } from "next";

export async function generateMetadata(slug: string): Promise<Metadata> {
  const zipDir = path.join(process.cwd(), "public", "zips");
  const files = fs.readdirSync(zipDir);
  const match = files.find(
    (file) => file.startsWith(`${slug}__`) && file.endsWith(".zip")
  );

  if (!match) {
    return { title: "Bestand niet gevonden" };
  }

  const [, title, client, date] = match.replace(".zip", "").split("__");

  return {
    title: `${title} – ${client}`,
    description: `Download foto's gemaakt op ${date} voor ${client}`,
  };
}
