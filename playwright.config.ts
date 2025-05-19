import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  retries: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    headless: false,
    baseURL: 'https://abc13514.sg-host.com/',
    screenshot: 'on',
    trace: 'on',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    // Temporarily disabling other browsers for debugging
    // { name: 'firefox',  use: { browserName: 'firefox' } },
    // { name: 'webkit',   use: { browserName: 'webkit' } },
  ],
  testMatch: /.*\.ts/,
});
