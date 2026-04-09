import { test, expect } from "@playwright/test";
import { loginAsAdmin, logout } from "./helpers/auth";

test.describe("관리자 기능", () => {
  test("로그인 후 관리자 버튼이 표시된다", async ({ page }) => {
    await page.goto("/");
    await loginAsAdmin(page);
    await expect(page.getByRole("button", { name: "관리자" })).toBeVisible();
  });

  test("관리자 페이지에 접근할 수 있다", async ({ page }) => {
    await page.goto("/");
    await loginAsAdmin(page);
    await page.getByRole("button", { name: "관리자" }).click();
    await expect(page).toHaveURL("/admin");
  });

  test("관리자 사이드바가 표시된다", async ({ page }) => {
    await page.goto("/");
    await loginAsAdmin(page);
    await page.getByRole("button", { name: "관리자" }).click();
    await expect(page.getByText("블로그 관리")).toBeVisible();
    await expect(page.getByText("글 쓰기")).toBeVisible();
    await expect(page.getByText("전체 글 목록")).toBeVisible();
  });

  test("글 쓰기 페이지로 이동할 수 있다", async ({ page }) => {
    await page.goto("/");
    await loginAsAdmin(page);
    await page.getByRole("button", { name: "관리자" }).click();
    await page.locator("aside").getByText("글 쓰기").click();
    await expect(page).toHaveURL("/posts/edit");
  });

  test("로그아웃 후 관리자 버튼이 사라진다", async ({ page }) => {
    await page.goto("/");
    await loginAsAdmin(page);
    await expect(page.getByRole("button", { name: "관리자" })).toBeVisible();
    await logout(page);
    await expect(page.getByRole("button", { name: "관리자" })).not.toBeVisible();
  });
});
