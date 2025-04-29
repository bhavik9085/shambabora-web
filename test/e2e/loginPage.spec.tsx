
import { test, expect } from '@playwright/test';
import { LogIn } from 'lucide-react';

test('homepage has welcome text', async ({ page }) => {
  await page.goto('/sign-in');

  await expect(page.locator('text=Login')).toBeVisible();

  const usernameInput = page.getByLabel ('Email');
  const passwordInput = page.getByLabel ('Password');

  await expect (usernameInput).toBeVisible();
  await expect (passwordInput).toBeVisible();

  await usernameInput.fill ('alphax.codes@gmail.com');
  await passwordInput.fill ('ShambaBora@2020');

  const loginButton = page.getByRole ('button')
  await loginButton.click ();

});
