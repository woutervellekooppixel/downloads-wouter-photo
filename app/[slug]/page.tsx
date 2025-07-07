import { DownloadCard } from "@/components/DownloadCard";
import fs from "fs";
import path from "path";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function Page({ params }: PageProps) {
  const { slug } = params;
  const zipDir = path.join(process.cwd(), "public/zips");
  const files = fs.readdirSync(zipDir);

  const match = files.find((filename) => filename.startsWith(`${slug}__`));

  if (!match) {
    return <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>Bestand niet gevonden</div>;
  }

  const [_, title, client, dateWithExt] = match.split("__");
  const date = dateWithExt.replace(".zip", "");

  return (
    <DownloadCard
      title={decodeURIComponent(title)}
      client={decodeURIComponent(client)}
      date={date}
      filename={match}
    />
  );
}