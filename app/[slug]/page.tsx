import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";

export default function Page({ params }: { params: { slug: string } }) {
  const zipDir = path.join(process.cwd(), "public", "zips");
  const zipFiles = fs.readdirSync(zipDir);
  const matchingZip = zipFiles.find((file) => file.startsWith(`${params.slug}__`) && file.endsWith(".zip"));

  if (!matchingZip) return notFound();

  const [_, title, client, dateWithExt] = matchingZip.split("__");
  const date = dateWithExt.replace(".zip", "");

  return (
    <main style={{ padding: "4rem", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "2rem" }}>{title}</h1>
      <p style={{ fontSize: "1.2rem", color: "#666" }}>{client} — {date}</p>
      <a
        href={`/zips/${matchingZip}`}
        download
        style={{
          display: "inline-block",
          marginTop: "2rem",
          background: "black",
          color: "white",
          padding: "1rem 2rem",
          textDecoration: "none",
          borderRadius: "0.5rem",
        }}
      >
        Download ZIP
      </a>
    </main>
  );
}

export async function generateStaticParams() {
  const zipDir = path.join(process.cwd(), "public", "zips");

  if (!fs.existsSync(zipDir)) return [];

  return fs
    .readdirSync(zipDir)
    .filter((file) => file.endsWith(".zip") && file.includes("__"))
    .map((file) => ({
      slug: file.split("__")[0],
    }));
}