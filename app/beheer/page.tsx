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

  const allSlugs: {
    type: string;
    slug: string;
    mtime: Date | null;
  }[] = [];

  for (const base of basePaths) {
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
          mtime: stat.mtime ?? null,
        });
      }
    } catch {
      // Map bestaat niet → negeren
    }
  }

  // Sorteer op type, dan slug
  allSlugs.sort(
    (a, b) => a.type.localeCompare(b.type) || a.slug.localeCompare(b.slug)
  );

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10 font-sans">


      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded">
          <thead>
            <tr className="text-left bg-gray-100 text-sm text-gray-600">
              <th className="py-3 px-4 text-black">Categorie</th>
              <th className="py-3 px-4 text-black">Slug</th>
              <th className="py-3 px-4">Link</th>
              <th className="py-3 px-4 hidden md:table-cell">Gewijzigd</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {allSlugs.map(({ type, slug, mtime }) => {
              const url = `https://downloads.wouter.photo/${slug}`;
              return (
                <tr
                  key={`${type}-${slug}`}
                  className="border-t border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4 text-sm text-black">{type}</td>
                  <td className="py-3 px-4 text-sm text-black">{slug}</td>
                  <td className="py-3 px-4">
                    <a
                      href={`/${slug}`}
                      className="text-blue-600 hover:underline break-all text-sm"
                    >
                      {url}
                    </a>
                  </td>
                  <td className="py-3 px-4 text-sm hidden md:table-cell text-gray-500 whitespace-nowrap">
                    {mtime ? new Date(mtime).toLocaleDateString("nl-NL") : "—"}
                  </td>
                  <td className="py-3 px-4">
                    <CopyButton text={url} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}