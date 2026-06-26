import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Selectores
  private loginButton = '#login2';
  private usernameInput = '#loginusername';
  private passwordInput = '#loginpassword';
  private submitButton = 'button:has-text("Log in")';

  // Actions
  async openLoginModal() {
    await this.page.click(this.loginButton);
  }

  async fillUsername(username: string) {
    await this.page.fill(this.usernameInput, username);
  }

  async fillPassword(password: string) {
    await this.page.fill(this.passwordInput, password);
  }

  async submitLogin() {
    await this.page.click(this.submitButton);
  }

  async login(username: string, password: string) {
    await this.openLoginModal();
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.submitLogin();
  }
}