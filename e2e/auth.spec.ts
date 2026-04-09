import { test, expect } from "@playwright/test";

test.describe("인증 플로우", () => {
  test("Footer에서 로그인 모달을 열 수 있다", async ({ page }) => {
    await page.goto("/");
    await page.locator("footer button").click();
    await expect(page.getByText("관리자 로그인")).toBeVisible();
  });

  test("로그인 모달에 아이디/비밀번호 입력 필드가 있다", async ({ page }) => {
    await page.goto("/");
    await page.locator("footer button").click();
    await expect(
      page.getByPlaceholder("아이디를 입력해주세요."),
    ).toBeVisible();
    await expect(
      page.getByPlaceholder("비밀번호를 입력해주세요."),
    ).toBeVisible();
  });

  test("모달 바깥 클릭 시 모달이 닫힌다", async ({ page }) => {
    await page.goto("/");
    await page.locator("footer button").click();
    await expect(page.getByText("관리자 로그인")).toBeVisible();

    // 모달 바깥 영역(backdrop) 클릭
    await page.locator(".backdrop-blur-sm").click({ position: { x: 10, y: 10 }, force: true });
    await expect(page.getByText("관리자 로그인")).not.toBeVisible();
  });

  test("비인증 상태에서 /admin 접근 시 메인으로 리다이렉트된다", async ({
    page,
  }) => {
    await page.goto("/admin");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL("/");
  });
});
