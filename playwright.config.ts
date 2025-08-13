// @ts-check
import { defineConfig } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */

export default defineConfig({
  testDir: './tests', // Directory where your test files are located
  timeout:30*1000,
  expect:{
    timeout:5000
  },
  reporter: [
  ['line'],
  ['allure-playwright']
],

  
  use: {
  baseURL: 'https://www.agoda.com',
  headless: true,
  browserName: 'chromium',
  viewport: { width: 1280, height: 720 },
  screenshot: 'only-on-failure', // Take screenshots when tests fail
},

 
});
























