import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Navibar } from "..";
import { useFetch } from "../../hooks/";
import { get } from "../../apis";

interface VerifyResponse {
  message: string;
  user?: {
    id: string;
    role: string;
    email: string;
  };
}

function Header() {
  const navigate = useNavigate();
  const locate = useLocation();
  const token = sessionStorage.getItem("token");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const data = useFetch<string, VerifyResponse>(
    get,
    token ? "http://localhost:5000/api/auth/verify" : "",
    token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : undefined,
  );

  useEffect(() => {
    if (data && data.message === "토큰 유효" && data.user?.role === "super") {
      setIsAdmin(true);
    } else if (data?.message !== "토큰 유효") {
      setIsAdmin(false);
    }
  }, [data]);

  return (
    <>
      <Navibar />
      <div className="bg-header flex h-40 items-center justify-center text-white text-left">
        {isAdmin && locate.pathname !== "/admin" && (
          <button className="cursor-pointer" onClick={() => navigate("/admin")}>
            관리자
          </button>
        )}
      </div>
    </>
  );
}

export default Header;
