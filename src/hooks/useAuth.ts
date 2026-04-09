import { useQuery } from "@tanstack/react-query";
import { verifyAuth } from "@/apis/AuthFetcher";

const useAuth = () => {
  const token = sessionStorage.getItem("token");

  const { data } = useQuery({
    queryKey: ["auth", "verify"],
    queryFn: verifyAuth,
    enabled: !!token,
  });

  const isAdmin = data?.user?.role === "admin";

  return { isAdmin, token };
};

export default useAuth;
