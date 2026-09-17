import { expect, test } from "@playwright/test";

test("generates a decision and records reply feedback", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Under-recovered" }).click();
  await page.getByRole("button", { name: "Generate one decision" }).click();
  await expect(page.getByRole("heading", { name: "Protect the morning." })).toBeVisible();
  await expect(page.getByText("Take a 12-minute daylight walk before noon.", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "I’ll do it" }).click();
  await expect(page.getByText("Action accepted")).toBeVisible();
  await page.getByRole("button", { name: "Change" }).click();
  await expect(page.getByRole("button", { name: "Not today" })).toBeVisible();
});

test("validates impossible input", async ({ page }) => {
  await page.goto("/#decision-lab");
  await page.getByLabel("Sleep duration").fill("18");
  await page.getByRole("button", { name: "Generate one decision" }).click();
  await expect(page.locator(".error[role='alert']")).toContainText("between 0 and 14 hours");
});

test("mobile layout has no horizontal overflow", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "mobile-only assertion");
  await page.goto("/");
  const widths = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
  expect(widths.scroll).toBeLessThanOrEqual(widths.client + 1);
  await page.getByRole("button", { name: "Ready to move" }).click();
  await page.getByRole("button", { name: "Generate one decision" }).click();
  await expect(page.getByRole("heading", { name: "You have room to move." })).toBeVisible();
});
