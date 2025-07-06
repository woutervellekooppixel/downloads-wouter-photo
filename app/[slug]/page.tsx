import fs from "fs";
import path from "path";

type Params = {
  slug: string;
};

export async function generateStaticParams() {
  const zipDir = path.join(process.cwd(), "public/zips");
  const files = fs.readdirSync(zipDir);

  return files
    .filter((f) => f.endsWith(".zip"))
    .map((file) => {
      const [slug] = file.split("__");
      return { slug };
    });
}

export default async function DownloadPage({ params }: { params: Params }) {
  const zipDir = path.join(process.cwd(), "public/zips");
  const files = fs.readdirSync(zipDir);

  const match = files.find((file) => file.startsWith(`${params.slug}__`));
  if (!match) {
    return <div className="text-center py-20">Download niet gevonden.</div>;
  }

  const [slug, title, client, dateRaw] = match.replace(".zip", "").split("__");
  const date = new Date(dateRaw).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-xl mx-auto py-20 px-4 text-center">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="mb-4 text-gray-600">
        Voor {client} – {date}
      </p>
      <a
        href={`/zips/${match}`}
        className="inline-block bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
        download
      >
        📥 Download ZIP
      </a>
    </div>
  );
}