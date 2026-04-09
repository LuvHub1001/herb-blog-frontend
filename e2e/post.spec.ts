import { test, expect } from "@playwright/test";

test.describe("게시글", () => {
  test("카테고리 페이지에서 게시글 목록이 표시된다", async ({ page }) => {
    await page.goto("/posts/til");
    await page.waitForLoadState("networkidle");

    // 게시글이 있거나 "게시글이 없습니다" 메시지가 표시된다
    const hasPost = await page.locator(".grid > div").count();
    const noPost = await page.getByText("아직 작성된 글이 없습니다").isVisible().catch(() => false);

    expect(hasPost > 0 || noPost).toBeTruthy();
  });

  test("전체 보기 링크를 클릭하면 카테고리 페이지로 이동한다", async ({
    page,
  }) => {
    await page.goto("/");

    // "전체 보기" 링크 중 첫 번째 클릭
    const viewAllLinks = page.getByText("전체 보기");
    const count = await viewAllLinks.count();

    if (count > 0) {
      await viewAllLinks.first().click();
      await expect(page).toHaveURL(/\/posts\//);
    }
  });
});
