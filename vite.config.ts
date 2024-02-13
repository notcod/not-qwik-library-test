import { defineConfig } from "vite";
import pkg from "./package.json";
import { qwikVite } from "@builder.io/qwik/optimizer";
import tsconfigPaths from "vite-tsconfig-paths";
import { qwikCity } from "@builder.io/qwik-city/vite";

const { dependencies = {}, peerDependencies = {} } = pkg as any;
console.log(dependencies, peerDependencies);
const makeRegex = (dep) => new RegExp(`^${dep}(/.*)?$`);
const excludeAll = (obj) => Object.keys(obj).map(makeRegex);

export default defineConfig(() => {
  return {
    build: {
      ssr: true,
      target: "es2020",
      lib: {
        entry: "./src/index.tsx",

        formats: ["es", "cjs"],
        fileName: (format) => `index.qwik.${format === "es" ? "mjs" : "cjs"}`,
      },
      rollupOptions: {
        input: ["src/index.tsx", "@qwik-city-plan"],
        // externalize deps that shouldn't be bundled into the library
        external: [
          /^node:.*/,
          // /^@builder.io\/qwik.*/,
          ...excludeAll(dependencies),
          ...excludeAll(peerDependencies),
        ],
      },
    },
    plugins: [qwikCity(), qwikVite({
      ssr: {
        input: "src/index.tsx",
        outDir: "lib",
      }
    }), tsconfigPaths()],
  };
});
