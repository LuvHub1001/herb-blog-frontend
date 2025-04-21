import { useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        className="absolute top-24 left-4 z-50 lg:hidden"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <div className="space-y-1">
          <div className="w-6 h-0.5 bg-white" />
          <div className="w-6 h-0.5 bg-white" />
          <div className="w-6 h-0.5 bg-white" />
        </div>
      </button>

      <div
        className={clsx(
          "bg-black text-white border-r w-64 flex-shrink-0 z-40",
          "lg:static lg:translate-x-0 lg:flex",
          "fixed top-32 left-0 transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "h-screen lg:h-auto",
          "overflow-y-auto",
        )}
      >
        <div className="flex flex-col w-full h-full overflow-y-auto p-4">
          <div className="flex justify-center mb-4">
            <div className="border border-white w-20 h-20 rounded-full overflow-hidden">
              <img
                src="/images/default_thumbnail.jpg"
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col items-center mb-10 text-center">
            <p className="text-[15px] font-semibold">LuvHub</p>
            <p className="text-[13px] text-gray-400">https://herb-blog.com</p>
          </div>

          <div className="flex flex-col text-[18px] gap-5">
            <div
              className="border-b border-white pb-1 cursor-pointer"
              onClick={() => navigate("/admin")}
            >
              블로그 관리
            </div>
            <div
              className="border-b border-white pb-1 cursor-pointer"
              onClick={() => navigate("/posts/edit")}
            >
              글 쓰기
            </div>
            <div
              className="border-b border-white pb-1 cursor-pointer"
              onClick={() => navigate("/admin/postlist")}
            >
              전체 글 목록
            </div>
            <div className="border-b border-white pb-1 cursor-pointer">
              카테고리 관리
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
