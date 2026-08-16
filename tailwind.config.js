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
      /*
       * Centaur has a 0.365em x-height against Manrope's 0.535 — it renders
       * at 68% of the apparent size the old sizes were picked for, which is
       * why everything set in it read small. Matching optically would take
       * 1.465x and blow every line length apart, so the text steps take a
       * measured 1.2x instead and keep their line-height in proportion.
       *
       * The whole ramp moves together rather than only the body steps: `xl`
       * through `3xl` are sub-headings in Big Shoulders, and lifting the text
       * sizes alone collapsed `xl` onto `2xl`. `5xl` and up are left where
       * they are — those are the hero-scale steps, already sized against the
       * layouts they sit in.
       */
      fontSize: {
        xs: ["0.9rem", "1.2rem"],
        sm: ["1.05rem", "1.5rem"],
        base: ["1.2rem", "1.8rem"],
        lg: ["1.35rem", "2.1rem"],
        xl: ["1.5rem", "2.1rem"],
        "2xl": ["1.8rem", "2.4rem"],
        "3xl": ["2.25rem", "2.7rem"],
        "4xl": ["2.7rem", "3rem"],
      },
      fontFamily: {
        // Both families are self-hosted by Astro's font pipeline, which exposes
        // them as CSS variables (see `fonts` in astro.config.mjs).
        display: ["var(--font-display)", "Arial Narrow", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "Georgia", "serif"],
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
