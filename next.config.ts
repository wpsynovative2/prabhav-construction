import type { NextConfig } from "next";

/**
 * Fully static site — `next build` emits plain HTML/CSS/JS into `out/`.
 * No Node server, no API routes: every form posts straight to Google Apps Script.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    // Required for `output: "export"` — the default optimizer needs a server.
    unoptimized: true,
  },
};

export default nextConfig;
