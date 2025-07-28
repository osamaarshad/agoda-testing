import { test } from '@playwright/test';
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

  if (newUrl.includes(`checkIn=${TestData.checkInDate}`)) {
    console.log(' ✓ Check-in date verified in URL');
  } else {
    console.log('Check-in date not found');
  }

  if (newUrl.includes(`checkOut=${TestData.checkOutDate}`)) {
    console.log(' ✓ Check-out date verified in URL');
  } else {
    console.log('Check-out date not found');
  }

  if (newUrl.toLowerCase().includes(TestData.location.toLowerCase())) {
    console.log(' ✓ Location verified in URL');
  } else {
    console.log('Location not found in URL');
  }

  if (newUrl.includes('adults=2') && newUrl.includes('children=1')) {
    console.log(' ✓ Travelers info verified in URL');
  } else {
    console.log('Travelers info NOT found in URL');
  }

  await newPage.pause();
});
