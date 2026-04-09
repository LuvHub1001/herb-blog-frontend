import clsx from "clsx";
import { useSidebar } from "@/hooks";

function Sidebar() {
  const { isOpen, handleToggleSidebar, handleNavigate } = useSidebar();

  const menuItems = [
    { label: "블로그 관리", path: "/admin" },
    { label: "글 쓰기", path: "/posts/edit" },
    { label: "전체 글 목록", path: "/admin/postlist" },
  ];

  return (
    <>
      <button
        className="absolute top-[72px] left-4 z-50 p-2 rounded-lg bg-slate-800 text-white lg:hidden cursor-pointer"
        onClick={handleToggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      <aside
        className={clsx(
          "bg-slate-900 text-white w-60 flex-shrink-0 z-40",
          "lg:static lg:translate-x-0",
          "fixed top-[120px] left-0 transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "h-screen lg:h-auto overflow-y-auto",
        )}
      >
        <div className="flex flex-col p-6">
          <div className="flex flex-col items-center mb-8 pb-6 border-b border-slate-700">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-600 mb-3">
              <img
                src="/images/default_thumbnail.jpg"
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm font-semibold">LuvHub</p>
            <p className="text-xs text-slate-400 mt-1">herb-blog.com</p>
          </div>

          <nav className="flex flex-col gap-1">
            {menuItems.map((item) => (
              <button
                key={item.path}
                className="text-left px-4 py-3 text-sm rounded-lg hover:bg-slate-800 transition-colors text-slate-300 hover:text-white cursor-pointer"
                onClick={() => handleNavigate(item.path)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
