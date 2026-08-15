// @ts-check
import { defineConfig, envField, fontProviders } from "astro/config";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: "https://aurescacare.com",

  // Static by default — every page is prerendered at build time. Only the
  // appointment endpoint opts out (`export const prerender = false`) and ships
  // as a single Vercel function.
  adapter: vercel(),

  env: {
    schema: {
      // Optional. When set, appointment requests are forwarded to this URL.
      APPOINTMENT_WEBHOOK_URL: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
    },
  },

  // Self-hosted Google fonts — no render-blocking request to fonts.googleapis.
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Big Shoulders",
      cssVariable: "--font-display",
      // 400 covers the italic accent spans inside headings, 500 is the default
      // heading weight, 600 the few heavier ones.
      weights: [400, 500, 600],
      // The family ships upright only — there is no italic to request.
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["Arial Narrow", "system-ui", "sans-serif"],
    },
    {
      // Centaur is licensed, so it comes from the repo rather than a provider.
      // The file lives under `src/` on purpose — anything in `public/` would be
      // copied into the build a second time.
      provider: fontProviders.local(),
      name: "Centaur",
      cssVariable: "--font-sans",
      // The family is a single upright regular: no bold, no italic. Anything
      // asking for heavier or slanted text is synthesised by the browser.
      options: {
        variants: [
          {
            weight: 400,
            style: "normal",
            src: ["./src/assets/fonts/centaur-400.woff2"],
          },
        ],
      },
      fallbacks: ["Georgia", "serif"],
    },
  ],
});
