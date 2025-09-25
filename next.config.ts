import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    SELIC_ANNUAL_RATE: process.env.SELIC_ANNUAL_RATE,
    ARCA_ANNUAL_RATE: process.env.ARCA_ANNUAL_RATE,
  },
};

export default nextConfig;
