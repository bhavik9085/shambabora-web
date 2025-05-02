import { test, expect } from "@playwright/test";

test("Navigation on the Manage Amcos menu", async ({ page }) => {
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

  await expect(page).toHaveURL(/dashboard/i);

  await expect(page).toHaveTitle(/Shamba Bora/);

  await page.getByRole("button", { name: /Manage Amcos/i }).click();
  await page.getByRole("link", { name: /Mcu/i }).click();

  await expect(page).toHaveURL("/dashboard/mcus");

  await page.getByText(/loading ...../i).waitFor({ state: "detached" });

  await expect(page.getByRole("heading", { name: "Mcu" })).toBeVisible();
  await expect(page.getByText(/Here's a list of your MCUs/i)).toBeVisible();

  // Select all table rows excluding the header
  const rows = await page.locator("tbody tr");
  const rowCount = await rows.count();

  const expectedData = [
    { sno: "1", mcuName: "Kyela MCU", region: "Dar" },
    { sno: "2", mcuName: "WD MCU", region: "Dar" },
    { sno: "3", mcuName: "DUMC", region: "Dar" },
    { sno: "4", mcuName: "Test MCU", region: "Dar" },
  ];

  for (let i = 0; i < rowCount; i++) {
    const cells = rows.nth(i).locator("td");
    const sno = await cells.nth(1).innerText();
    const mcuName = await cells.nth(2).locator("span").innerText();
    const region = await cells.nth(3).locator("span").innerText();

    expect(sno.trim()).toBe(expectedData[i].sno);
    expect(mcuName.trim()).toBe(expectedData[i].mcuName);
    expect(region.trim()).toBe(expectedData[i].region);
  }

  await expect(page.getByText("0 of 4 row(s) selected.")).toBeVisible();
});
