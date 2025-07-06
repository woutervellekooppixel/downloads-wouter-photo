import path from "path";
import { promises as fs } from "fs";

type Item = {
  slug: string;
  title: string;
  client: string;
  date: string;
  filename: string;
};

export default async function HomePage() {
  const zipDir = path.join(process.cwd(), "public", "zips");
  const files = await fs.readdir(zipDir);

  const items: Item[] = files
    .filter((file) => file.endsWith(".zip"))
    .map((file) => {
      const [slug, title, client, dateRaw] = file.replace(".zip", "").split("__");
      return {
        slug,
        title,
        client,
        date: new Date(dateRaw).toLocaleDateString("nl-NL", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        filename: file,
      };
    });

  return (
    <main style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Downloads</h1>

      {items.map((item) => {
        const url = `https://downloads.wouter.photo/zips/${item.filename}`;

        return (
          <div
            key={item.slug}
            style={{
              marginBottom: "2rem",
              paddingBottom: "1rem",
              borderBottom: "1px solid #ccc",
            }}
          >
            <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
              {item.title}
            </h2>
            <p>
              <strong>Klant:</strong> {item.client}
              <br />
              <strong>Datum:</strong> {item.date}
            </p>
            <a
              href={`/zips/${item.filename}`}
              download
              style={{
                display: "inline-block",
                marginTop: "0.5rem",
                padding: "0.5rem 1rem",
                backgroundColor: "#000",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "4px",
              }}
            >
              📥 Download ZIP
            </a>
            <pre
              style={{
                background: "#f4f4f4",
                padding: "0.75rem",
                borderRadius: "4px",
                marginTop: "1rem",
                overflowX: "auto",
              }}
            >
              <code style={{ color: "#333" }}>{url}</code>
            </pre>
            <button
              onClick={() => navigator.clipboard.writeText(url)}
              style={{
                marginTop: "0.5rem",
                padding: "0.5rem 1rem",
                backgroundColor: "#000",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              📋 Kopieer link
            </button>
          </div>
        );
      })}
    </main>
  );
}