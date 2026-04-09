import { useEffect } from "react";
import { usePagination } from "@/hooks";

interface PaginationProps {
  totalItems: number;
  divider: number;
  onPageChange: (page: number) => void;
}

function Pagination({ totalItems, divider, onPageChange }: PaginationProps) {
  const {
    currentPage,
    isFirstPage,
    isLastPage,
    pageNumbers,
    handlePrevButton,
    handleNextButton,
    handleFirstButton,
    handleLastButton,
    setCurrentPage,
  } = usePagination({ totalItems, divider });

  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage, onPageChange]);

  if (pageNumbers.length <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-1.5 mt-8">
      <button
        className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        onClick={handleFirstButton}
        disabled={isFirstPage}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
        </svg>
      </button>
      <button
        className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        onClick={handlePrevButton}
        disabled={isFirstPage}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <div className="flex gap-1">
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
              currentPage === pageNumber
                ? "bg-indigo-500 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
            onClick={() => setCurrentPage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      <button
        className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        onClick={handleNextButton}
        disabled={isLastPage}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
      <button
        className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        onClick={handleLastButton}
        disabled={isLastPage}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
}

export default Pagination;
