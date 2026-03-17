// @ts-check
import { defineConfig } from "astro/config";

import { loadEnv } from "vite";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { storyblok } from "@storyblok/astro";
import netlify from "@astrojs/netlify";

const env = loadEnv("", process.cwd(), "STORYBLOK");

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  server: {
    allowedHosts: ["localhost", "127.0.0.1"],
  },
  integrations: [
    react(),
    storyblok({
      accessToken: env.STORYBLOK_PREVIEW_ACCESS_TOKEN,
      apiOptions: {
        region: "eu",
        cache: {
          clear: "auto",
        },
      },
      components: {
        // Blocks
        cta: "storyblok/bloks/Cta",
        image_and_text: "storyblok/bloks/ImageAndText",
        carousel: "storyblok/bloks/Carousel",
        
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
  adapter: netlify({
    imageCDN: env.SITE_MODE === "production",
    edgeMiddleware: false,
  }),
});
