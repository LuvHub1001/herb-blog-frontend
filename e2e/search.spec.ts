import { test, expect } from "@playwright/test";

test.describe("검색 기능", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("검색 아이콘 클릭 시 검색 모달이 열린다", async ({ page }) => {
    await page.locator("nav button").last().click();
    await expect(
      page.getByPlaceholder("검색어를 입력해주세요"),
    ).toBeVisible();
  });

  test("검색어 입력 후 Enter로 검색 페이지로 이동한다", async ({ page }) => {
    await page.locator("nav button").last().click();
    await page.getByPlaceholder("검색어를 입력해주세요").fill("테스트");
    await page.getByPlaceholder("검색어를 입력해주세요").press("Enter");
    await expect(page).toHaveURL(/\/search\?keyword=/);
  });

  test("검색 결과 페이지에 키워드가 표시된다", async ({ page }) => {
    await page.goto("/search?keyword=테스트");
    await expect(page.getByText("'테스트'")).toBeVisible();
  });
});
