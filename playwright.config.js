// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config=({
  testDir: './tests',
  timeout: 40*1000,
  expect:{
    timeout: 5000
  },
  reporter:'html',
  use: {
    baseURL: 'https://eventhub.rahulshettyacademy.com',
    headless: false,
  },
   projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
  ],
});
  

module.exports =config

