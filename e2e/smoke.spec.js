const { test, expect } = require("@playwright/test");

test("smoke flow: home loads and villas page is reachable", async ({ page }) => {
  await page.goto("/");
  // Footer also contains "Property Rentals", so scope to the navbar logo.
  await expect(page.locator(".logo")).toBeVisible();

  await page.goto("/villas");
  await expect(page.getByRole("heading", { name: "ALL VILLAS" })).toBeVisible();
});
