import path from "path"; 
import { promises as fs } from "fs";
import { headers } from "next/headers";
import CopyButton from "../components/CopyButton";

export default async function BeheerPage() {
  const headersList = await headers();
  const auth = headersList.get("authorization");

  const expected = `Basic ${Buffer.from(
    `${process.env.ADMIN_USER}:${process.env.ADMIN_PASS}`
  ).toString("base64")}`;

  if (auth !== expected) {
    return new Response("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Beheer"' },
    });
  }

  const photosDir = path.join(process.cwd(), "public", "photos");

  let slugs: string[] = [];
  try {
    const entries = await fs.readdir(photosDir, { withFileTypes: true });
    slugs = entries
      .filter((e) => e.isDirectory())
      .map((e) => e.name.toString()); // ✅ forceer string
  } catch {
    return <div>Kan mappen niet lezen.</div>;
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
          {slugs.map((slug) => {
            const url = `https://downloads.wouter.photo/${slug}`;
            return (
              <tr key={slug} style={{ borderTop: "1px solid #ccc" }}>
                <td style={{ padding: "0.5rem 0" }}>{slug}</td>
                <td>
                  <a href={`/${slug}`} style={{ color: "#0070f3" }}>
                    {url}
                  </a>
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
