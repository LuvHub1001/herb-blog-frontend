import { useEffect } from "react";
import { usePagination } from "../../hooks";

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

  return (
    <div className="flex justify-center items-center gap-3">
      <div>
        <img
          src="/images/arrow_back2.svg"
          onClick={!isFirstPage ? handleFirstButton : undefined}
        />
      </div>

      <div>
        <img
          src="/images/arrow_back1.svg"
          onClick={!isFirstPage ? handlePrevButton : undefined}
        />
      </div>

      <div className="flex gap-3">
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`border-2 rounded-4xl w-8 h-8 cursor-pointer text-center ${
              currentPage === pageNumber
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => setCurrentPage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      <div>
        <img
          src="/images/arrow_front1.svg"
          onClick={isLastPage ? undefined : handleNextButton}
        />
      </div>

      <div>
        <img
          src="/images/arrow_front2.svg"
          onClick={isLastPage ? undefined : handleLastButton}
        />
      </div>
    </div>
  );
}

export default Pagination;
