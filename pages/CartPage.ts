import { Page, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private cartItems = '.success td:nth-child(2)';
  private deleteButtons = 'a:has-text("Delete")';
  private totalPrice = '#totalp';
  private placeOrderButton = 'button:has-text("Place Order")';

  async goto() {
    await this.page.click('#cartur');
  }

  async expectProductInCart(productName: string) {
    await expect(this.page.locator(this.cartItems)).toContainText(productName);
  }

  async expectCartNotEmpty() {
    await expect(this.page.locator(this.cartItems)).toHaveCount(1);
  }

  async getTotalPrice() {
    const total = await this.page.locator(this.totalPrice).textContent();
    return Number(total);
  }

  async openPlaceOrder() {
    await this.page.click(this.placeOrderButton);
  }
}