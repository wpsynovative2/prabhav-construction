import "server-only";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };

let logo: string | undefined;
async function logoData() {
  logo ??= `data:image/png;base64,${(await readFile(join(process.cwd(), "public/logo/logo-dark.png"))).toString("base64")}`;
  return logo;
}

/** Brand card used by every Open Graph image: brown field, gold hairline, logo, headline. */
export async function OgCard({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  const src = await logoData();
  const rays = [
    "M790 353 Q795 325 820 304 L907 581 Z",
    "M852 247 Q873 220 907 210 L946 570 Z",
    "M950 143 Q986 125 1023 143 L986 563 Z",
    "M1066 210 Q1100 220 1121 247 L1027 570 Z",
    "M1153 304 Q1178 325 1183 353 L1066 581 Z",
  ];
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background: "linear-gradient(135deg, #612f15 0%, #3a1a0b 60%, #2a1409 100%)",
        color: "white",
        fontFamily: "serif",
      }}
    >
      <svg viewBox="782 124 408 462" width="560" height="634" style={{ position: "absolute", right: -60, bottom: -120, opacity: 0.18 }}>
        {rays.map((d) => (
          <path key={d} d={d} fill="#fbcd8c" />
        ))}
      </svg>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, width: "100%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={188} height={120} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 26, color: "#e5c96a", display: "flex" }}>{eyebrow}</div>
          <div style={{ fontSize: 76, lineHeight: 1.05, marginTop: 12, display: "flex", maxWidth: 900 }}>{title}</div>
          <div style={{ width: 120, height: 3, background: "#d4af37", marginTop: 28, display: "flex" }} />
          <div style={{ fontSize: 30, color: "rgba(255,255,255,0.8)", marginTop: 24, display: "flex" }}>{subtitle}</div>
        </div>
      </div>
    </div>
  );
}
