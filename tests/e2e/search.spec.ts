import { test, expect } from '@playwright/test';

test.describe('@regression Search Flow', () => {

  test('should display products', async ({ page }) => {
    await page.goto('https://www.demoblaze.com');

    await page.click('text=Samsung galaxy s6');

    await expect(page.locator('.name')).toBeVisible();
  });

});