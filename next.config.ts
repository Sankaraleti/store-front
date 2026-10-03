import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Sample catalogue photography (see src/lib/catalog.ts). `search` must
    // match the query string the catalogue appends exactly.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/photo-*",
        search: "?w=2000&q=80",
      },
    ],
  },
};

export default nextConfig;
