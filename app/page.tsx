import path from "path";
import { promises as fs } from "fs";
import CopyButton from "./components/CopyButton";
import Link from "next/link";

export default async function HomePage() {
  const photosDir = path.join(process.cwd(), "public", "photos");

  let folders: string[] = [];
  try {
    const entries = await fs.readdir(photosDir, { withFileTypes: true });
    folders = entries.filter((e) => e.isDirectory()).map((e) => e.name);
  } catch (err) {
    console.error("Kan mappen niet lezen:", err);
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 style={{ marginBottom: "1rem" }}>📁 Mijn fotoprojecten</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th align="left">Titel (slug)</th>
            <th align="left">Link</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {folders.map((slug) => {
            const url = `https://jouwdomein.nl/${slug}`;
            return (
              <tr key={slug} style={{ borderTop: "1px solid #ccc" }}>
                <td style={{ padding: "0.5rem 0" }}>{slug}</td>
                <td>
                  <Link href={`/${slug}`} style={{ color: "#0070f3" }}>
                    {url}
                  </Link>
                </td>
                <td>
                  <CopyButton text={url} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
