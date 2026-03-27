const { defineConfig } = require("vitest/config");
const react = require("@vitejs/plugin-react-swc");

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
