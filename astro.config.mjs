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
      // The interface voice: controls, wayfinding and the running text that is
      // read at a glance rather than at length.
      provider: fontProviders.google(),
      name: "Manrope",
      cssVariable: "--font-ui",
      weights: [400, 500, 600, 700],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["system-ui", "sans-serif"],
    },
    {
      // The reading voice. Unlike the Centaur it replaces, this ships real
      // weights and a true italic, so emphasis in prose is drawn rather than
      // synthesised by the browser.
      provider: fontProviders.google(),
      name: "Cormorant Garamond",
      cssVariable: "--font-sans",
      weights: [400, 500, 600],
      styles: ["normal", "italic"],
      subsets: ["latin"],
      fallbacks: ["Georgia", "serif"],
    },
  ],
});
