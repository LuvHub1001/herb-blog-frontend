import { useQuery } from "@tanstack/react-query";
import { verifyAuth } from "@/apis/AuthFetcher";

const useAuth = () => {
  const token = sessionStorage.getItem("token");

  const { data } = useQuery({
    queryKey: ["auth", "verify"],
    queryFn: verifyAuth,
    enabled: !!token,
    // 인증 검증은 자주 찌르면 rate limit(429)에 걸림 — 5분 캐시 + 재마운트/포커스 재요청 차단
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  const isAdmin = data?.user?.role === "admin";

  return { isAdmin, token };
};

export default useAuth;
