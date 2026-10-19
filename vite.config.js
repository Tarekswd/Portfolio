import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VERCEL ? "/" : "/Portfolio/",
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      ignored: [
        "**/.kiro/**",
        "**/.claude/**",
        "**/.cursor/**",
        "**/.git/**",
        "**/.github/**",
        "**/*.md",
        "**/*.log",
        "**/*.txt",
        "**/*.tmp*",
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
