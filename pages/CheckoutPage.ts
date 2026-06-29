import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Modal selectors
  private nameInput = '#name';
  private countryInput = '#country';
  private cityInput = '#city';
  private cardInput = '#card';
  private monthInput = '#month';
  private yearInput = '#year';

  private purchaseButton = 'button:has-text("Purchase")';
  private confirmationModal = '.sweet-alert';
  private confirmationText = '.sweet-alert h2';
  private okButton = 'button:has-text("OK")';

  async fillForm(data: {
    name: string;
    country: string;
    city: string;
    card: string;
    month: string;
    year: string;
  }) {
    await this.page.fill(this.nameInput, data.name);
    await this.page.fill(this.countryInput, data.country);
    await this.page.fill(this.cityInput, data.city);
    await this.page.fill(this.cardInput, data.card);
    await this.page.fill(this.monthInput, data.month);
    await this.page.fill(this.yearInput, data.year);
  }

  async submitOrder() {
    await this.page.click(this.purchaseButton);
  }

  async expectConfirmationVisible() {
    await expect(this.page.locator(this.confirmationModal)).toBeVisible();
  }

  async expectSuccessMessage() {
    await expect(this.page.locator(this.confirmationText))
      .toContainText('Thank you for your purchase');
  }

  async closeConfirmation() {
    await this.page.click(this.okButton);
  }
}
