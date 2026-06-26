import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { users } from '../../fixtures/test-data';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.demoblaze.com');
});

test.describe('Login Data Driven', () => {

  Object.entries(users).forEach(([key, user]) => {

    test(`Login test - ${key}`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.login(user.username, user.password);

      if (key === 'validUser') {
        await expect(page.locator('#nameofuser')).toBeVisible();
      } else {
        await expect(page.locator('#nameofuser')).not.toBeVisible();
      }
    });

  });

});

test.describe('@smoke Login Flow', () => {
  test('should login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await page.goto('https://www.demoblaze.com');
    await loginPage.login('testuser', 'testpassword');
    await expect(page.locator('#nameofuser')).toBeVisible();
  });
});