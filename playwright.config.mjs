import { defineConfig } from "@playwright/test";

// Start the portfolio when CI runs so layout checks use the same routes visitors receive.
export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.mjs",
  timeout: 30_000,
  use: {
    baseURL: "http://127.0.0.1:4605",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run dev",
    url: "http://127.0.0.1:4605",
    reuseExistingServer: !process.env.CI,
  },
});
