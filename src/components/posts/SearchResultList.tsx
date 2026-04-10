import { Pagination } from "@/components";
import { useSearchResult } from "@/hooks";

function SearchResultList() {
  const {
    keyword,
    paginatedPosts,
    totalItems,
    divider,
    setCurrentPage,
    handlePostClick,
  } = useSearchResult();

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <h1 className="text-2xl font-bold text-slate-800 mb-1">
        <span className="text-indigo-500">'{keyword}'</span> 검색 결과
      </h1>
      <p className="text-sm text-slate-400 mb-8">{totalItems}개의 글을 찾았습니다</p>

      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedPosts.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-slate-100 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer group"
            onClick={() => handlePostClick(item.id)}
          >
            <div className="h-[200px] overflow-hidden bg-slate-100">
              <img
                src={item.thumbnail || "/images/default_thumbnail.svg"}
                alt="썸네일"
                width={400}
                height={200}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />
            </div>
            <div className="p-5 flex flex-col flex-1">
              <span className="text-[11px] font-semibold text-indigo-500 uppercase tracking-wider mb-2">
                {item.category}
              </span>
              <h3 className="text-base font-semibold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-slate-400 line-clamp-2 mt-2 leading-relaxed flex-1">
                {item.subContent}
              </p>
              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-50 text-xs text-slate-400">
                <span>{item.writer}</span>
                <span className="text-slate-200">·</span>
                <span>{item.workdate?.slice(0, 10)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        totalItems={totalItems}
        divider={divider}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default SearchResultList;
