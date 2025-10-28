import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [react(), tailwindcss(), visualizer({filename: './stats.html', open: true, gzipSize: true})],
  build: {
    minify: 'esbuild',
    sourcemap: false,
    lib: {
      entry: path.resolve(
        __dirname,
        "src/features/estimate/index.tsx"
      ),
      name: "EstimateFormWidget",
      fileName: (format) => `EstimateFormWidget.${format}.js`,
      formats: ["umd"],
    },
    cssCodeSplit: false,
  },
  define: {
    'process.env': {},
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
