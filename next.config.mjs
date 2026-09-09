// Plain JavaScript on purpose — do NOT rename this back to next.config.ts.
// A TypeScript config has to be transpiled before it can be read, and on build
// hosts with an old glibc (Hostinger among them) the native SWC binary cannot
// load, so that transpile step fails with ERR_MODULE_NOT_FOUND. A .mjs config
// is read directly by Node and sidesteps the problem entirely.

/**
 * Fully static site — `next build` emits plain HTML/CSS/JS into `out/`.
 * No Node server, no API routes: every form posts straight to Google Apps Script.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    // Required for `output: "export"` — the default optimizer needs a server.
    unoptimized: true,
  },
};

export default nextConfig;
