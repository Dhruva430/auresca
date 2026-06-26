/**
 * Build a responsive Unsplash URL. Centralised so every image is requested at
 * the right size with auto format/compression (good for LCP + page score).
 */
export function img(
  base: string,
  width: number,
  height?: number,
  quality = 68
): string {
  const params = new URLSearchParams({
    w: String(width),
    q: String(quality),
    auto: "format",
    fit: "crop",
  });
  if (height) params.set("h", String(height));
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}${params.toString()}`;
}

/** Build a srcset string for crisp images on high-DPR screens. */
export function srcset(base: string, widths: number[], height?: number): string {
  return widths
    .map((w) => `${img(base, w, height ? Math.round((height / widths[0]) * w) : undefined)} ${w}w`)
    .join(", ");
}

export function formatDate(value: string | Date): string {
  const d = typeof value === "string" ? new Date(value) : value;
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
