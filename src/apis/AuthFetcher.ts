import instance from "@/apis";
import type { AuthUser } from "@/types";

// 로그인
export const login = async (
  id: string,
  password: string,
): Promise<{ token: string }> => {
  const { data } = await instance.post("/auth/login", { id, password });
  return data;
};

// 인증 확인
export const verifyAuth = async (): Promise<{ user: AuthUser }> => {
  const { data } = await instance.get("/auth/verify");
  return data;
};
