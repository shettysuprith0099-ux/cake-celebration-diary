import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isLovableSandbox =
  process.env.LOVABLE_SANDBOX === "1" ||
  !!process.env.DEV_SERVER__PROJECT_PATH;

export default defineConfig({
  // GitHub Pages needs a static build.
  // Keep Lovable's normal Cloudflare setup inside Lovable,
  // but disable Nitro when building outside Lovable.
  nitro: isLovableSandbox ? undefined : false,

  tanstackStart: {
    // Keep your existing server entry for Lovable.
    ...(isLovableSandbox
      ? {
          server: { entry: "server" },
        }
      : {
          // Static SPA build for GitHub Pages.
          spa: {
            enabled: true,
            prerender: {
              outputPath: "/index.html",
            },
          },
        }),
  },

  vite: {
    base: "/cake-celebration-diary/",
  },
});
