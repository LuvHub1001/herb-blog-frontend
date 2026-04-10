import { test, expect } from "@playwright/test";

test.describe("메인 페이지", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("메인 페이지가 렌더링된다", async ({ page }) => {
    await expect(page.locator("nav").getByText("Herb Blog")).toBeVisible();
  });

  test("네비게이션 바가 표시된다", async ({ page }) => {
    await expect(page.locator("nav")).toBeVisible();
  });

  test("RECENT 섹션이 표시된다", async ({ page }) => {
    await expect(page.getByText("RECENT")).toBeVisible();
  });

  test("TIL 섹션이 표시된다", async ({ page }) => {
    await expect(page.getByText("TIL")).toBeVisible();
  });

  test("DIARY 섹션이 표시된다", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Diary", exact: true })).toBeVisible();
  });

  test("Footer가 표시된다", async ({ page }) => {
    await expect(page.locator("footer")).toBeVisible();
  });
});
