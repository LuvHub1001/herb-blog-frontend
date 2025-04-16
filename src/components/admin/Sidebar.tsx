import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-80 h-screen bg-black text-white border-b ">
      <div className="profile-box flex w-full justify-center">
        <div className="border-white border-1 w-50 h-50 mt-5">
          <img src="/images/default_thumbnail.jpg" />
        </div>
      </div>
      <div className="profile-box flex w-full justify-center">
        <div className="border-white border-1 w-50 h-20 mb-10 pt-3 pl-3">
          <p className="text-[15px]">LuvHub</p>
          <p className="text-[13px]">https://herb-blog.com</p>
        </div>
      </div>

      <div className="flex flex-col text-[20px] gap-3 justify-center items-center">
        <div className="w-full border-b border-white">
          <span
            className="pl-2 cursor-pointer"
            onClick={() => navigate("/admin")}
          >
            블로그 관리
          </span>
        </div>
        <div className="w-full border-b border-white">
          <span
            className="pl-2 cursor-pointer"
            onClick={() => navigate("/posts/edit")}
          >
            글 쓰기
          </span>
        </div>
        <div className="w-full border-b border-white">
          <span
            className="pl-2 cursor-pointer"
            onClick={() => navigate("/admin/postlist")}
          >
            전체 글 목록
          </span>
        </div>
        <div className="w-full border-b border-white">
          <span className="pl-2 cursor-pointer">카테고리 관리</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
