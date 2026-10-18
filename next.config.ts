import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Hide the Next.js dev-tools floating launcher in the bottom-left corner
  // so it doesn't appear in screenshots used as project previews.
  devIndicators: false,
  // The original /work page is archived in archive/legacy-site. Old links and
  // search results land on the homepage with the project folder already open.
  async redirects() {
    return [
      { source: "/work", destination: "/#folder-projects", permanent: true },
      // Inner West Volley now lives on the ProVolley card.
      { source: "/innerwest", destination: "/provolley", permanent: true },
    ];
  },
};

export default nextConfig;
