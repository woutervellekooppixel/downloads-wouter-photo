import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Access-Control-Allow-Headers",
            value: "Authorization",
          },
          {
            key: "WWW-Authenticate",
            value: 'Basic realm="downloads.wouter.photo"',
          },
        ],
      },
    ];
  },
};

export default nextConfig;