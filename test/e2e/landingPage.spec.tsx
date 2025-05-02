import { test, expect } from "@playwright/test";

test("sign page when login is clicked", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("text=Login")).toBeVisible();

  //  Need to double click here to get the new page
  await page.getByRole("link", { name: /login/i }).click();
  await page.getByRole("link", { name: /login/i }).click();

  await expect(page).toHaveURL(/.*\/sign-in.*/);
  await expect(page).toHaveURL(/.*\/sign-in.*/);

  //  These e-mail and password need to be externilized so that we can do multiple user tests
  await page.getByLabel(/email/i).fill("alphax.codes@gmail.com");
  await page.getByLabel(/password/i).fill("ShambaBora@2020");

  // 5. Optional: Click the submit button if available
  const loginButton = page.getByRole("button", { name: /sign in|login/i });
  if (await loginButton.isVisible()) {
    await loginButton.click();
  }

  //await expect(page).toHaveURL(/dashboard|home|account/i);
  await expect(page).toHaveURL(/dashboard/i);

  await expect(page).toHaveTitle(/Shamba Bora/);
  await expect(page.getByRole("heading", { name: /dashboard/i })).toBeVisible();

  //  Assert the Farmer Statistics graph chart
  await expect(page.getByText(/Farmer Statistics/i)).toBeVisible();

  //  Assert the Panel Recent Farmers
  await expect(page.getByText(/Recent Farmers/i)).toBeVisible();

  /*
  This needs to be fixed to not be hardcoded
  await expect(
    page.getByText(/You made 52 registrations this month./i)
  ).toBeVisible();
   */

});