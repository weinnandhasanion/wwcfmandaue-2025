// @ts-check
import { defineConfig } from "astro/config";

import { loadEnv } from "vite";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { storyblok } from "@storyblok/astro";

const env = loadEnv("", process.cwd(), "STORYBLOK");

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  integrations: [
    react(),
    storyblok({
      accessToken: env.STORYBLOK_PREVIEW_ACCESS_TOKEN,
      apiOptions: {
        region: "eu",
        cache: {
          clear: "manual",
        },
      },
      components: {
        // Page types
        homepage: "storyblok/pages/Home",
        page: "storyblok/pages/Page",
      },
      bridge: {
        resolveLinks: "url",
      },
    }),
  ],
  output: "server",
  image: {
    domains: ["storyblok.com", "a-ap.storyblok.com"],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
