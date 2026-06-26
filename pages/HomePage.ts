import { Page, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private productTitles = '.card-title a';
  private cartLink = '#cartur';

  async goto() {
    await this.page.goto('/');
  }

  async searchProduct(productName: string) {
    await this.page.click(`text=${productName}`);
  }

  async openCart() {
    await this.page.click(this.cartLink);
  }

  async expectProductsVisible() {
    await expect(this.page.locator(this.productTitles)).toHaveCountGreaterThan(0);
  }
}