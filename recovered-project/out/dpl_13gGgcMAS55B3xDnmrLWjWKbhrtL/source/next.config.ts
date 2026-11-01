import type { NextConfig } from "next";
import { redirects } from "./config/redirects";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  redirects,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
    ],
  },
};

export default nextConfig;