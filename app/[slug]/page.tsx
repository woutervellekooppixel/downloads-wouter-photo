import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const zipDir = path.join(process.cwd(), "public", "zips");
  const files = fs.readdirSync(zipDir);
  return files
    .filter((file) => file.endsWith(".zip"))
    .map((file) => {
      const [slug] = file.split("__");
      return { slug };
    });
}

export default function Page({ params }: PageProps) {
  const zipDir = path.join(process.cwd(), "public", "zips");
  const files = fs.readdirSync(zipDir);
  const match = files.find(
    (file) => file.startsWith(`${params.slug}__`) && file.endsWith(".zip")
  );

  if (!match) {
    notFound();
  }

  const [, title, client, dateRaw] = match.replace(".zip", "").split("__");
  const date = new Date(dateRaw).toLocaleDateString("nl-NL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>{title}</h1>
      <p style={{ marginBottom: "0.5rem" }}>
        <strong>Klant:</strong> {client}
      </p>
      <p style={{ marginBottom: "1.5rem" }}>
        <strong>Datum:</strong> {date}
      </p>
      <a
        href={`/zips/${match}`}
        download
        style={{
          display: "inline-block",
          padding: "0.75rem 1.25rem",
          backgroundColor: "#000",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "4px",
        }}
      >
        📥 Download ZIP
      </a>
    </main>
  );
}