import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "sans-serif",
        background: "#f9f9f9",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>😕 Pagina niet gevonden</h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
        De downloadpagina die je zoekt bestaat niet (meer).
      </p>
      <Link
        href="/"
        style={{
          background: "#007aff",
          color: "#fff",
          padding: "0.75rem 1.5rem",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        ⬅️ Terug naar home
      </Link>
    </div>
  );
}