import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 78, 84],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
    ],
  },
};

export default nextConfig;
