/** @type {import('next').NextConfig} */

// Vi använder static export som default. Det funkar både för Vercel-hosting
// och för Capacitor/iOS-bygge. Dev-läget (npm run dev) påverkas inte —
// next dev ignorerar output-flaggan.
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
