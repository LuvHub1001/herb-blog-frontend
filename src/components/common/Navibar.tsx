import { useNavi, useSearch } from "@/hooks";

function Navibar() {
  const { isSearchClick, handleHome, handleSearchToggle, handleBackdropClick } =
    useNavi();
  const { inputValue, handleInputChange, handleSearchSubmit } = useSearch();

  return (
    <>
      <nav className="sticky top-0 z-[1000] w-full bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
        <div className="max-w-6xl mx-auto h-14 flex justify-between items-center px-5">
          <div
            className="text-lg font-bold text-slate-800 cursor-pointer hover:text-indigo-600 transition-colors tracking-tight"
            onClick={handleHome}
          >
            Herb Blog
          </div>
          <button
            className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-700 cursor-pointer"
            onClick={handleSearchToggle}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[18px] h-[18px]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
          </button>
        </div>
      </nav>

      {isSearchClick && (
        <div
          className="fixed inset-0 flex items-start justify-center pt-20 bg-black/40 backdrop-blur-sm z-[1001]"
          onClick={handleBackdropClick}
        >
          <div
            className="w-[92%] max-w-xl bg-white rounded-2xl shadow-2xl shadow-black/10 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-1.5">
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="검색어를 입력해주세요"
                  className="w-full py-3.5 pl-11 pr-4 rounded-xl text-[15px] text-slate-700 bg-slate-50/80 placeholder-slate-400 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/30 transition-all"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
                  autoFocus
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navibar;
