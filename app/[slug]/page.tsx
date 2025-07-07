import fs from "fs";
import path from "path";
import HeroSection from "../components/HeroSection";

export default function Page({ params }: { params: { slug: string } }) {
  const zipDirectory = path.join(process.cwd(), "public", "zips");

  const zipFiles = fs.readdirSync(zipDirectory);
  const matchingZip = zipFiles.find((filename) =>
    filename.startsWith(`${params.slug}__`)
  );

  if (!matchingZip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Download not found</h1>
      </div>
    );
  }

  const [, title, client, dateWithExt] = matchingZip.split("__");
  const date = dateWithExt.replace(".zip", "");

  return (
    <HeroSection
      title={decodeURIComponent(title)}
      client={decodeURIComponent(client)}
      date={date}
      downloadLink={`/zips/${matchingZip}`}
    />
  );
}