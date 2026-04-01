const { defineConfig } = require("vitest/config");
// Same React plugin as vite.config.js — @vitejs/plugin-react-swc pulls @swc/core native binaries that often break on Linux CI.
const react = require("@vitejs/plugin-react");

module.exports = defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/tests/setup.js",
    globals: true,
    css: true,
    include: ["src/tests/**/*.test.{js,jsx}"],
  },
});
