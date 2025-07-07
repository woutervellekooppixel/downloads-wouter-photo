import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  const zipDir = path.join(process.cwd(), "public", "zips");
  const files = fs.readdirSync(zipDir);

  return files
    .filter((file) => file.endsWith(".zip"))
    .map((file) => {
      const [slug] = file.split("__");
      return { slug };
    });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Page(props: any) {
  const slug = props?.params?.slug;

  const zipDir = path.join(process.cwd(), "public", "zips");
  const files = fs.readdirSync(zipDir);

  const match = files.find(
    (file) => file.startsWith(`${slug}__`) && file.endsWith(".zip")
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
    <main
      style={{
        fontFamily: "sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f2f2f2",
        padding: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          width: "100%",
          background: "#fff",
          padding: "2rem",
          borderRadius: "16px",
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>{title}</h1>
        <p style={{ margin: "0.5rem 0", fontSize: "1rem" }}>
          📁 <strong>Klant:</strong> {client}
        </p>
        <p style={{ margin: "0.5rem 0", fontSize: "1rem" }}>
          🗓️ <strong>Datum:</strong> {date}
        </p>
        <a
          href={`/zips/${match}`}
          download
          style={{
            display: "inline-block",
            marginTop: "1.5rem",
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            backgroundColor: "#007aff",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "8px",
            transition: "background-color 0.2s ease",
          }}
          onMouseOver={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#005cd6";
          }}
          onMouseOut={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#007aff";
          }}
        >
          📥 Download ZIP
        </a>
      </div>
    </main>
  );
}