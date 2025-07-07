import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { DownloadCard } from "../components/DownloadCard";

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

// ✅ LET OP: GEEN PageProps of extra types
export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

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
    <main style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <DownloadCard
        title={title}
        client={client}
        date={date}
        filename={match}
        shareUrl={`https://downloads.wouter.photo/${slug}`}
      />
    </main>
  );
}