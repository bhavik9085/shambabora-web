
import { test, expect } from '@playwright/test';

test('The default landing page contains the following data', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('text=Login')).toBeVisible();
});
