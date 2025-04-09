import { useState, useEffect, useMemo } from "react";

interface PaginationProps {
  totalItems: number;
  divider: number;
}

const usePagination = ({ totalItems, divider }: PaginationProps) => {
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    setTotalPage(Math.ceil(totalItems / divider));
  }, [totalItems, divider]);

  const isFirstPage: boolean = useMemo(() => currentPage === 1, [currentPage]);
  const isLastPage: boolean = useMemo(
    () => currentPage >= totalPage,
    [currentPage],
  );

  const pageNumbers = Array.from(
    { length: totalPage },
    (_, idx: number) => idx + 1,
  );

  const handlePrevButton = () => {
    setCurrentPage((prev: number) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextButton = () => {
    setCurrentPage((prev: number) => (prev < totalPage ? prev + 1 : prev));
  };

  const handleFirstButton = () => {
    setCurrentPage(1);
  };

  const handleLastButton = () => {
    setCurrentPage(totalPage);
  };

  return {
    totalPage,
    currentPage,
    isFirstPage,
    isLastPage,
    pageNumbers,
    setCurrentPage,
    handlePrevButton,
    handleFirstButton,
    handleNextButton,
    handleLastButton,
  };
};

export default usePagination;
