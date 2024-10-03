import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'bdd-tests/step-definition/**/*.ts',
  globalTimeout: 100000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    launchOptions: {
      // 1
      args: ["--start-maximized"],
    },
  },

  projects: [
    {
      name: "chromium",
      use: {
        viewport: null,
      },
    },
  ],

});
