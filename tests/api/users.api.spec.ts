import { test, expect } from '@playwright/test';

import { ReqresClient } from '../../api/clients/ReqresClient';
import { UserValidator } from '../../api/validators/UserValidator';

test.describe('@api Users API', () => {

  test('should retrieve users list', async ({ request }) => {

    const client = new ReqresClient(request);

    const response = await client.getUsers();

    expect(response.status()).toBe(200);

    const body = await response.json();

    UserValidator.validateUserList(body.data);
  });

});


test('should retrieve single user', async ({ request }) => {

  const client = new ReqresClient(request);

  const response = await client.getUser(2);

  expect(response.status()).toBe(200);

  const body = await response.json();

  UserValidator.validateUser(body.data);
});


test('should return 404 for non existing user', async ({ request }) => {

  const client = new ReqresClient(request);

  const response = await client.getUser(9999);

  expect(response.status()).toBe(404);
});