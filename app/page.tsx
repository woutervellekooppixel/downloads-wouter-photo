// app/page.tsx
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const headersList = headers();
  const auth = headersList.get("authorization");

  const expected = `Basic ${Buffer.from(
    `${process.env.ADMIN_USER}:${process.env.ADMIN_PASS}`
  ).toString("base64")}`;

  if (auth !== expected) {
    return new Response("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Wouter"' },
    });
  }

  // ... jouw bestaande code
}
