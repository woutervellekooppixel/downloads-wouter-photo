import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { generateMetadata as getMetadata } from "./metadata";

export async function generateMetadata(props: any): Promise<Metadata> {
  return getMetadata(props.params.slug);
}

export default function Page(props: any) {
  const slug = props.params.slug;
  const zipDir = path.join(process.cwd(), "public", "zips");
  const files = fs.readdirSync(zipDir);
  const match = files.find(
    (file) => file.startsWith(`${slug}__`) && file.endsWith(".zip")
  );

  if (!match) {
    notFound();
  }

  const [, title, client, date] = match.replace(".zip", "").split("__");

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>{title}</h1>
      <p>
        Voor: <strong>{client}</strong>
      </p>
      <p>Datum: {date}</p>
      <a
        href={`/zips/${match}`}
        download
        style={{
          display: "inline-block",
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          background: "black",
          color: "white",
          textDecoration: "none",
          borderRadius: "4px",
        }}
      >
        Download ZIP
      </a>
    </div>
  );
}
