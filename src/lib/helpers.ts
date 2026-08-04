/**
 * Build a responsive image URL. Remote (Unsplash) images get sizing +
 * auto-format params so every request is the right size; local files under
 * /public are returned untouched.
 */
export function img(
  base: string,
  width: number,
  height?: number,
  quality = 68
): string {
  if (!/^https?:\/\//.test(base)) return base;

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

/**
 * Build a srcset string for crisp images on high-DPR screens. Returns an empty
 * string for local files, which are served as-is.
 */
export function srcset(base: string, widths: number[], height?: number): string {
  if (!/^https?:\/\//.test(base)) return "";

  return widths
    .map(
      (w) =>
        `${img(base, w, height ? Math.round((height / widths[0]) * w) : undefined)} ${w}w`
    )
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
