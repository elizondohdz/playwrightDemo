import { expect } from '@playwright/test';

export class UserValidator {
  static validateUser(user: any) {
    expect(user.id).toBeDefined();
    expect(user.email).toBeTruthy();
    expect(user.first_name).toBeTruthy();
    expect(user.last_name).toBeTruthy();
  }

  static validateUserList(users: any[]) {
    expect(users.length).toBeGreaterThan(0);

    users.forEach(user => {
      this.validateUser(user);
    });
  }
}