import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    base: "/volunteer-opportunity-board/",
    build: {
        sourcemap: false,
    },
    plugins: [react()],
});
