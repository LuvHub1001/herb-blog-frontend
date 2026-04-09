import { Pagination } from "@/components";
import { useAdminPostList } from "@/hooks";

function AdminPostList() {
  const {
    postItems,
    totalItems,
    divider,
    setCurrentPage,
    handlePostClick,
  } = useAdminPostList();

  return (
    <div className="w-full px-6 py-6 max-w-5xl mx-auto">
      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        <div className="hidden md:grid grid-cols-5 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-3 bg-slate-50 border-b border-slate-100">
          <p className="text-left">제목</p>
          <p>작성자</p>
          <p>카테고리</p>
          <p>조회수</p>
          <p>작성일자</p>
        </div>

        {postItems.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-1 md:grid-cols-5 border-b border-slate-50 last:border-b-0 px-6 py-4 items-center hover:bg-slate-50 transition-colors cursor-pointer"
            onClick={() => handlePostClick(item.id)}
          >
            <div className="font-medium text-slate-700 hover:text-indigo-600 transition-colors text-left truncate">
              {item.title}
            </div>
            <div className="text-sm text-slate-500 text-center">{item.writer}</div>
            <div className="text-sm text-slate-400 uppercase text-center">{item.category}</div>
            <div className="text-sm text-slate-400 text-center">{item.viewCount}</div>
            <div className="text-sm text-slate-400 text-center">{item.workdate.slice(0, 10)}</div>
          </div>
        ))}
      </div>

      <Pagination
        divider={divider}
        onPageChange={setCurrentPage}
        totalItems={totalItems}
      />
    </div>
  );
}

export default AdminPostList;
