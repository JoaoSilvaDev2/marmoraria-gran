import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  ...(isGithubPages
    ? { basePath: "/marmoraria-gran", assetPrefix: "/marmoraria-gran/" }
    : {}),
};

export default nextConfig;
