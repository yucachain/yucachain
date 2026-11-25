import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@yucachain/shared"],
  images: { unoptimized: true },
};

export default nextConfig;
