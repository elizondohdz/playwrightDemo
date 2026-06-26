import { Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private addToCartButton = 'a:has-text("Add to cart")';

  async addToCart() {
    await this.page.click(this.addToCartButton);
  }

  async acceptAlert() {
    this.page.on('dialog', async dialog => {
      await dialog.accept();
    });
  }
}