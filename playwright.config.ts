import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./test/e2e",
  timeout: 30 * 1000, // 30 seconds per test
  expect: {
    timeout: 5000, // Timeout for expect assertions
  },
  fullyParallel: true,
  retries: 1, // Retry failed tests once
  reporter: "html",
  use: {
    baseURL: "http://localhost:5173",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    headless: true,
    browserName: "chromium", // Default browser
  },
  /*
  webServer : {
    command: 'npm run dev',
    port: 5173,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  */

  projects: [
    /*
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    */
    {
      name: "Firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    /*
    {
      name: 'WebKit',
      use: { ...devices['Desktop Safari'] },
    },
    */
  ],
});
