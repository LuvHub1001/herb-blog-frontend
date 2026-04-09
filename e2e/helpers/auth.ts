import { Page } from "@playwright/test";

const TEST_ID = process.env.TEST_ID || "test";
const TEST_PW = process.env.TEST_PW || "";

// 관리자 로그인 헬퍼 — API로 직접 토큰 발급 후 주입
export const loginAsAdmin = async (page: Page) => {
  const response = await page.request.post("http://localhost:5000/api/auth/login", {
    data: { id: TEST_ID, password: TEST_PW },
  });
  const body = await response.json();
  const token = body.data.token;

  await page.evaluate((t) => sessionStorage.setItem("token", t), token);
  await page.reload();
  await page.waitForLoadState("networkidle");
};

// 로그아웃 헬퍼
export const logout = async (page: Page) => {
  await page.evaluate(() => sessionStorage.removeItem("token"));
  await page.reload();
  await page.waitForLoadState("networkidle");
};
