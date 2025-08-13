// base/BasePage.ts
import { expect, Locator, Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async fillInput(locator: Locator, text: string) {
    await locator.fill(text);
  }

  async click(locator: Locator) {
    await locator.click();
  }

  async waitForVisibility(locator: Locator, timeout = 5000) {
    await expect(locator).toBeVisible({ timeout });
  }

  async getInnerText(locator: Locator) {
    return await locator.innerText();
  }

  async getInputValue(locator: Locator) {
    return await locator.inputValue();
  }

  async assertContains(actual: string, expected: string) {
    expect(actual.toLowerCase()).toContain(expected.toLowerCase());
  }

  async assertExactMatch(actual: string, expected: string) {
    expect(actual.replace(/\s/g, '').toLowerCase()).toBe(expected.replace(/\s/g, '').toLowerCase());
  }}