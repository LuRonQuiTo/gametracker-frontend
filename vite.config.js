import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "", // si luego usas GitHub Pages, aquí pones "/nombre-repo/"
});
