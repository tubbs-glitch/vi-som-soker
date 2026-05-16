/** @type {import('next').NextConfig} */

// När vi bygger för Capacitor sätter vi MOBILE_BUILD=1.
// Då kör vi static export och inaktiverar Image-optimizern.
const isMobileBuild = process.env.MOBILE_BUILD === "1";

const nextConfig = {
  reactStrictMode: true,
  ...(isMobileBuild
    ? {
        output: "export",
        images: { unoptimized: true },
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
