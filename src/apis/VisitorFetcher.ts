import instance from "@/apis";
import type { VisitorStats } from "@/types";

// 방문자 기록
export const recordVisitor = async (): Promise<void> => {
  // IP는 서버에서 추출하는 것이 일반적이지만, API 스펙상 body에 필요
  // 실제 IP는 서버에서 판별하므로 빈 문자열 전송
  await instance.post("/visitor", { ip: "" });
};

// 방문자 통계
export const getVisitorStats = async (): Promise<VisitorStats> => {
  const { data } = await instance.get("/visitor/stats");
  return data;
};
