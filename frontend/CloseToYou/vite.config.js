import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    watch: {
      usePolling: true,
    },
    port: 3000,
  },
  plugins: [
    react(),
    svgr(),
    VitePWA({
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.js",
      registerType: "autoUpdate",
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: "Close To You",
        short_name: "Close To You",
        description: "시각 장애인을 위한 스마트 AI 옷장 서비스",
        theme_color: "#ffffff",
      },

      injectManifest: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
      },

      devOptions: {
        enabled: false,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
  ],
});
