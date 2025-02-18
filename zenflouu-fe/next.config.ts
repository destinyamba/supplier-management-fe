import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  devIndicators: {
    buildActivityPosition: "bottom-right",
  },
};

module.exports = {
  devIndicators: {
    buildActivityPosition: "bottom-right",
  },
};

export default nextConfig;
