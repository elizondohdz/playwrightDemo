import { APIRequestContext } from '@playwright/test';

export class ReqresClient {
  constructor(private request: APIRequestContext) {}

  async getUsers(page: number = 2) {
    return await this.request.get(
      `https://reqres.in/api/users?page=${page}`
    );
  }

  async getUser(id: number) {
    return await this.request.get(
      `https://reqres.in/api/users/${id}`
    );
  }
}