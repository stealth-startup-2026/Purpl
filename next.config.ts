import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Hide the Next.js dev-tools floating launcher in the bottom-left corner
  // so it doesn't appear in screenshots used as project previews.
  devIndicators: false,
};

export default nextConfig;
