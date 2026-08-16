/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,ts,md}"],
  theme: {
    extend: {
      colors: {
        // Primary — golds
        gold: {
          DEFAULT: "#C89D42", // Antique Gold
          rich: "#D8B15B", // Rich Gold
          champagne: "#E8D2A3", // Champagne Gold
        },
        // Secondary — sage & rose
        sage: {
          DEFAULT: "#8D947A", // Sage Green (secondary)
          soft: "#B8BEA9",
        },
        rose: {
          DEFAULT: "#DDA7B4", // Dusty Rose
          blush: "#F2D3D9", // Blush Pink
        },
        // Neutrals
        ivory: "#F9F7F2",
        cream: "#F4F0E8",
        beige: "#E9E2D5",
        charcoal: "#333333",
        olive: "#4E5645",
      },
      fontFamily: {
        // Both families are self-hosted by Astro's font pipeline, which exposes
        // them as CSS variables (see `fonts` in astro.config.mjs).
        // Display and prose are the same family now: Cormorant carries the
        // headings as well as the reading copy, with Manrope on the
        // interface. `display` stays as a name so no markup has to change.
        display: ["var(--font-sans)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Georgia", "serif"],
        ui: ["var(--font-ui)", "system-ui", "-apple-system", "sans-serif"],
      },
      maxWidth: {
        content: "1320px",
        wide: "1920px",
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(78, 86, 69, 0.18)",
        card: "0 18px 50px -20px rgba(78, 86, 69, 0.22)",
        gold: "0 14px 40px -14px rgba(200, 157, 66, 0.45)",
      },
      backgroundImage: {
        "gold-grad": "linear-gradient(135deg, #D8B15B 0%, #C89D42 100%)",
        "hero-fade":
          "linear-gradient(180deg, rgba(249,247,242,0) 0%, rgba(249,247,242,0.85) 85%, #F9F7F2 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease both",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
