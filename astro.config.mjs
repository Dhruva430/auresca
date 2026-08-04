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
      name: "Cormorant Garamond",
      cssVariable: "--font-display",
      weights: [500, 600],
      styles: ["normal", "italic"],
      subsets: ["latin"],
      fallbacks: ["Georgia", "serif"],
    },
    {
      provider: fontProviders.google(),
      name: "Manrope",
      cssVariable: "--font-sans",
      weights: [400, 500, 600, 700],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["system-ui", "sans-serif"],
    },
  ],
});
