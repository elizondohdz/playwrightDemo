import { test, expect } from '@playwright/test';
import { checkoutData } from '../../fixtures/checkout-data';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('Checkout Data Driven', () => {

  Object.entries(checkoutData).forEach(([key, data]) => {

    test(`Checkout flow - ${key}`, async ({ page }) => {

      const cartPage = new CartPage(page);
      const checkoutPage = new CheckoutPage(page);

      await page.goto('https://www.demoblaze.com');

      await page
        .getByRole('link', {
          name: 'Samsung galaxy s6'
        })
        .click();

      page.once('dialog', d => d.accept());
      await page.click('a:has-text("Add to cart")');

      await cartPage.goto();
      await cartPage.openPlaceOrder();

      await checkoutPage.fillForm(data);
      await checkoutPage.submitOrder();

      await checkoutPage.expectConfirmationVisible();
      await checkoutPage.expectSuccessMessage();

      await expect(page.locator('.sweet-alert')).toContainText('Amount');
    });

  });

});


test.describe('@smoke Checkout Flow', () => {

  test('should complete purchase', async ({ page }) => {
    await page.goto('https://www.demoblaze.com');

    await page.click('a:has-text("Samsung galaxy s6")');

    page.once('dialog', d => d.accept());
    await page.click('a:has-text("Add to cart")');

    await page.click('#cartur');

    await page.click('button:has-text("Place Order")');

    await page.fill('#name', 'Test User');
    await page.fill('#country', 'Mexico');
    await page.fill('#city', 'Xalapa');
    await page.fill('#card', '4111111111111111');
    await page.fill('#month', '12');
    await page.fill('#year', '2027');

    await page.click('button:has-text("Purchase")');

    await expect(page.locator('.sweet-alert')).toContainText('Thank you for your purchase');
  });

});