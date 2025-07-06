import fs from "fs";
import path from "path";

export default function Home() {
  const zipDir = path.join(process.cwd(), "public", "zips");
  const files = fs.existsSync(zipDir)
    ? fs.readdirSync(zipDir).filter((file) => file.endsWith(".zip"))
    : [];

  const downloads = files.map((file) => {
    const [slug, title, client, dateRawWithExt] = file.split("__");
    const dateRaw = dateRawWithExt.replace(".zip", "");
    const date = new Date(dateRaw).toLocaleDateString("nl-NL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return { slug, title, client, date, filename: file };
  });

  return (
    <main style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>
        Downloads
      </h1>

      {downloads.length === 0 && <p>Er zijn momenteel geen downloads beschikbaar.</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {downloads.map((item) => (
          <li
            key={item.slug}
            style={{
              marginBottom: "2rem",
              padding: "1.5rem",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          >
            <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
              {item.title}
            </h2>
            <p style={{ marginBottom: "0.3rem" }}>
              <strong>Klant:</strong> {item.client}
            </p>
            <p style={{ marginBottom: "1rem" }}>
              <strong>Datum:</strong> {item.date}
            </p>
            <a
              href={`/zips/${item.filename}`}
              download
              style={{
                display: "inline-block",
                padding: "0.5rem 1rem",
                backgroundColor: "#000",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "4px",
              }}
            >
              📥 Download ZIP
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}