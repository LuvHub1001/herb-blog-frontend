import { useNavigate, useLocation } from "react-router-dom";
import { Navibar } from "@/components";
import { useAuth } from "@/hooks";

function Header() {
  const navigate = useNavigate();
  const locate = useLocation();
  const { isAdmin } = useAuth();

  return (
    <>
      <Navibar />
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
        <div className="absolute inset-0 bg-[url('/images/header.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0">
          <div className="absolute top-10 left-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center py-16 sm:py-20 px-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Herb Blog
          </h1>
          <p className="mt-3 text-base sm:text-lg text-indigo-200/70 font-light">
            개발 기록과 일상을 담는 공간
          </p>
          {isAdmin && locate.pathname !== "/admin" && (
            <button
              className="mt-6 px-6 py-2.5 text-sm bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full font-medium transition-all backdrop-blur-sm cursor-pointer"
              onClick={() => navigate("/admin")}
            >
              관리자 페이지
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
