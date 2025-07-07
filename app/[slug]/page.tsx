import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";

type Params = {
  slug: string;
};

export default async function Page({ params }: { params: Params }) {
  const { slug } = params;

  // Pad naar de map met ZIP-bestanden
  const zipDir = path.join(process.cwd(), "public", "zips");

  // Alle bestanden in de map ophalen
  const files = fs.readdirSync(zipDir);

  // Zoek het bestand dat begint met het slug + dubbele underscores en eindigt op .zip
  const match = files.find(
    (file) => file.startsWith(`${slug}__`) && file.endsWith(".zip")
  );

  if (!match) {
    notFound();
  }

  // Bestandsnaam zonder .zip extensie → "slug__title__client__yyyy-mm-dd"
const [, title, client, date] = match.replace(".zip", "").split("__");

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-neutral-100 text-neutral-900">
      <div className="max-w-2xl text-center">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-lg text-neutral-600 mb-1">Opdrachtgever: {client}</p>
        <p className="text-sm text-neutral-500 mb-6">{date}</p>

        <a
          href={`/zips/${match}`}
          download
          className="inline-block bg-black text-white py-3 px-6 rounded-lg font-semibold transition hover:bg-neutral-800"
        >
          Download ZIP
        </a>
      </div>
    </main>
  );
}