import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
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
  const slug = params.slug;

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
        fontFamily: "system-ui, sans-serif",
        minHeight: "100vh",
        backgroundColor: "#f6f6f6",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "1rem",
          padding: "2rem",
          maxWidth: "600px",
          width: "100%",
          boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>{title}</h1>
        <p style={{ marginBottom: "0.5rem", color: "#555" }}>
          <strong>Klant:</strong> {client}
        </p>
        <p style={{ marginBottom: "1.5rem", color: "#555" }}>
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
            borderRadius: "8px",
            fontWeight: 600,
            transition: "background 0.3s",
          }}
          onMouseOver={(e) =>
            ((e.target as HTMLAnchorElement).style.backgroundColor = "#333")
          }
          onMouseOut={(e) =>
            ((e.target as HTMLAnchorElement).style.backgroundColor = "#000")
          }
        >
          📥 Download ZIP
        </a>
      </div>
    </main>
  );
}