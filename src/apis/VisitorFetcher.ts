import instance from "@/apis";
import type { VisitorStats } from "@/types";

// 방문자 기록 (IP는 서버에서 x-forwarded-for로 자동 추출)
export const recordVisitor = async (): Promise<void> => {
  await instance.post("/visitor", {});
};

// 방문자 통계
export const getVisitorStats = async (): Promise<VisitorStats> => {
  const { data } = await instance.get("/visitor/stats");
  return data;
};
