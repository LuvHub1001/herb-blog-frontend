import { test, expect } from "@playwright/test";

test.describe("라우트 네비게이션", () => {
  test("메인 페이지에서 TIL 카테고리로 이동한다", async ({ page }) => {
    await page.goto("/");
    await page.getByText("TIL").first().click();
    await expect(page).toHaveURL(/\/posts\/til/);
  });

  test("메인 페이지에서 DIARY 카테고리로 이동한다", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("heading", { name: "Diary", exact: true }).click();
    await expect(page).toHaveURL(/\/posts\/diary/);
  });

  test("로고 클릭 시 메인 페이지로 이동한다", async ({ page }) => {
    await page.goto("/posts/til");
    await page.locator("nav").getByText("Herb Blog").click();
    await expect(page).toHaveURL("/");
  });

  test("카테고리 페이지가 렌더링된다", async ({ page }) => {
    await page.goto("/posts/til");
    const hasPosts = page.locator(".uppercase");
    const noPost = page.getByText("아직 작성된 글이 없습니다");
    await expect(hasPosts.or(noPost).first()).toBeVisible();
  });
});
