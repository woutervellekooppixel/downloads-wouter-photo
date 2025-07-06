import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/", // Alleen voor de rootpagina
        headers: [
          {
            key: "Access-Control-Allow-Headers",
            value: "Authorization",
          },
        ],
      },
    ];
  },
};

export default nextConfig;