import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  esbuild: {
    drop: ["console", "debugger"],
  },
  build: {
    target: "es2020",
    sourcemap: false,
    modulePreload: false,
    rollupOptions: {
      output: {
        manualChunks: {
          router: ["react-router-dom"],
          query: ["@tanstack/react-query"],
          editor: ["@toast-ui/editor"],
          chart: ["chart.js", "react-chartjs-2"],
        },
      },
    },
  },
});
