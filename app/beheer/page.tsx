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

  const basePaths = [
    { label: "📷 Photos", dir: "photos" },
    { label: "📎 Files", dir: "files" },
  ];

  const allSlugs: { type: string; slug: string }[] = [];

  for (const base of basePaths) {
    const folderPath = path.join(process.cwd(), "public", base.dir);
    try {
      const entries = await fs.readdir(folderPath, { withFileTypes: true });
      const slugs = entries
        .filter((e) => e.isDirectory())
        .map((e) => ({ type: base.label, slug: e.name }));
      allSlugs.push(...slugs);
    } catch {
      // map bestaat niet of is leeg → geen probleem
    }
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 style={{ marginBottom: "1rem" }}>📁 Mijn downloads</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th align="left">Categorie</th>
            <th align="left">Slug</th>
            <th align="left">Link</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {allSlugs.map(({ type, slug }) => {
            const url = `https://downloads.wouter.photo/${slug}`;
            return (
              <tr key={`${type}-${slug}`} style={{ borderTop: "1px solid #ccc" }}>
                <td style={{ padding: "0.5rem 0" }}>{type}</td>
                <td>{slug}</td>
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