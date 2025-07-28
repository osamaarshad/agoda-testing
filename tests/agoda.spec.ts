import { test, expect } from '@playwright/test';
import { AgodaPage } from '../pages/AgodaPage';
import { TestData } from '../data/TestData';

test('Agoda - Search and validate URL data', async ({ page }) => {
  const agoda = new AgodaPage(page);
  await agoda.goto('https://www.agoda.com/');

  const clickedText = await agoda.searchLocation();
  const updatedValue = await agoda.getInputValue(agoda.input);
  await agoda.verifySearchInput(updatedValue, clickedText || '');

  await agoda.applySearchCriteria();
  await agoda.validateInlineData();

  const [newPage] = await Promise.all([
    page.context().waitForEvent('page'),
    agoda.searchButton.click()
  ]);

  await newPage.waitForLoadState('domcontentloaded');
  const newUrl = newPage.url();

  // ✅ Replacing if/else with Playwright assertions:
  expect(newUrl).toContain(`checkIn=${TestData.checkInDate}`);
  console.log('✓ Check-in date verified in URL');

  expect(newUrl).toContain(`checkOut=${TestData.checkOutDate}`);
  console.log('✓ Check-out date verified in URL');

  expect(newUrl.toLowerCase()).toContain(TestData.location.toLowerCase());
  console.log('✓ Location verified in URL');

  expect(newUrl).toContain('adults=2');
  expect(newUrl).toContain('children=1');
  console.log('✓ Travelers info verified in URL');

  await newPage.pause();
});
