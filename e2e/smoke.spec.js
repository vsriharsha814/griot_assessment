const { test, expect } = require("@playwright/test");

test("smoke flow: home loads and villas page is reachable", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("PROPERTY RENTALS")).toBeVisible();

  await page.goto("/villas");
  await expect(page.getByRole("heading", { name: "ALL VILLAS" })).toBeVisible();
});
