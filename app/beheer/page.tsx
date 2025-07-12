import CopyButton from "@/components/CopyButton";
import data from "../../data/beheer.json";

export default function BeheerPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10 font-sans">
      <h1 className="text-2xl font-bold mb-6 text-black">📂 Projectbeheer</h1>

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
            {data.map(({ type, slug, mtime }) => {
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