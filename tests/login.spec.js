import { test, expect } from '@playwright/test';

test('Register -> Login -> Redirect to Product', async ({ page }) => {

  const email = `test_${Date.now()}@example.com`;
  const password = 'Password123';
  const name = 'Test User';

  // login page
  await page.goto('http://localhost:3000/login');
  await expect(page).toHaveURL(/login/);

  // goto register
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page).toHaveURL(/register/);

  // fill register info
  await page.fill('#name', name);
  await page.fill('#email', email);
  await page.fill('#password', password);

  await page.getByRole('button', { name: 'Create Account' }).click();

  // redirect to login page
  await expect(page).toHaveURL(/login/);

  // fill login info
  await page.fill('#email', email);
  await page.fill('#password', password);

  await page.getByRole('button', { name: 'Login' }).click();

  // redirect to products page
  await expect(page).toHaveURL(/products/);

  // check element exist
  await expect(page.getByText('สินค้า')).toBeVisible();
});
