import { test, expect } from "@playwright/test";

test.describe("인증 플로우", () => {
  test("/login 페이지가 렌더링된다", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByText("관리자 로그인")).toBeVisible();
  });

  test("로그인 페이지에 아이디/비밀번호 입력 필드가 있다", async ({ page }) => {
    await page.goto("/login");
    await expect(
      page.getByPlaceholder("아이디를 입력해주세요."),
    ).toBeVisible();
    await expect(
      page.getByPlaceholder("비밀번호를 입력해주세요."),
    ).toBeVisible();
  });

  test("Footer에 로그인 버튼이 노출되지 않는다", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("footer button")).toHaveCount(0);
  });

  test("비인증 상태에서 /admin 접근 시 메인으로 리다이렉트된다", async ({
    page,
  }) => {
    await page.goto("/admin");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL("/");
  });
});
