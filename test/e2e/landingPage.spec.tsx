import { test, expect } from "@playwright/test";

test("sign page when login is clicked", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("text=Login")).toBeVisible();

  //
  await page.getByRole("link", { name: /login/i }).click();
  await page.getByRole("link", { name: /login/i }).click();

  await expect(page).toHaveURL(/.*\/sign-in.*/);
  await expect(page).toHaveURL(/\/sign/i);

  await page.getByLabel(/email/i).fill('alphax.codes@gmail.com');
  await page.getByLabel(/password/i).fill('ShambaBora@2020');

  /*
  const usernameInput = page.getByLabel("Email");
  const passwordInput = page.getByLabel("Password");
  */

  // 5. Optional: Click the submit button if available
  const loginButton = page.getByRole('button', { name: /sign in|login/i });
  if (await loginButton.isVisible()) {
    await loginButton.click();
  }

  /*
  await expect(usernameInput).toBeVisible();
  await expect(passwordInput).toBeVisible();

  await usernameInput.fill("alphax.codes@gmail.com");
  await passwordInput.fill("ShambaBora@2020");

  const loginButton2 = page.getByRole("button");
  await loginButton2.click();
  */
});
