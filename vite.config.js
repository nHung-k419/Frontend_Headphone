import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api-province": {
        target: "http://provinces.open-api.vn",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-province/, ""),
      },
    },
  },
});
