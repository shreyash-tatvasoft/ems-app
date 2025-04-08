import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env : {
    GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY,
  }
};

export default nextConfig;
