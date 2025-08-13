import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { TestData } from '../data/TestData';

export class AgodaPage extends BasePage {
  readonly input: Locator;
  readonly suggestions: Locator;
  readonly checkinDate: Locator;
  readonly checkoutDate: Locator;
  readonly plusButton: Locator;
  readonly checkinText: Locator;
  readonly checkoutText: Locator;
  readonly travelersText: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    super(page);
    this.input = page.locator('.SearchBoxTextEditor');
    this.suggestions = page.locator('li[data-selenium="autosuggest-item"]');
    this.checkinDate = page.locator(`[data-selenium-date="${TestData.checkInDate}"]`);
  this.checkoutDate = page.locator(`[data-selenium-date="${TestData.checkOutDate}"]`);
    this.plusButton = page.locator('[data-selenium="plus"]').nth(2);
    this.checkinText = page.locator('.SearchBoxTextDescription__title').nth(0);
    this.checkoutText = page.locator('.SearchBoxTextDescription__title').nth(1);
    this.travelersText = page.locator('.SearchBoxTextDescription__title').nth(2);
    this.searchButton = page.locator('button[data-selenium="searchButton"]');
  }

  async searchLocation() {
    await this.fillInput(this.input, TestData.location);
    await this.waitForVisibility(this.suggestions.first());
    const firstSuggestionText = await this.suggestions.first().getAttribute('data-text');
    await this.suggestions.first().click();
    console.log(' Clicked on:', firstSuggestionText);
    return firstSuggestionText;
  }

  async verifySearchInput(updatedValue: string, clickedText: string) {
    await this.assertContains(updatedValue, clickedText || '');
    console.log(' Search box value:', updatedValue);
  }

  async applySearchCriteria() {
    await this.click(this.checkinDate);
    await this.click(this.checkoutDate);
    await this.click(this.plusButton);
  }

  async validateInlineData() {
    const checkin = await this.getInnerText(this.checkinText);
    const checkout = await this.getInnerText(this.checkoutText);
    const travelers = await this.getInnerText(this.travelersText);

    console.log('✓ Check-in:', checkin);
    console.log('✓ Check-out:', checkout);
    console.log('✓ Travelers info:', travelers);

    await this.assertContains(checkin, TestData.expectedCheckInText);
    await this.assertContains(checkout, TestData.expectedCheckOutText);
    await this.assertExactMatch(travelers, TestData.expectedTravelersText);
  }
}
