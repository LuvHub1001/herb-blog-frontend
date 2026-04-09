import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBoards } from "@/apis/BoardFetcher";

const DIVIDER = 10;

const useAdminPostList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useQuery({
    queryKey: ["boards", "admin", currentPage],
    queryFn: () => getBoards(currentPage, DIVIDER),
  });

  const postItems = data?.res ?? [];
  const totalItems = data?.totalCount ?? 0;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handlePostClick = (id: number) => {
    navigate(`/posts/detail/${id}`);
  };

  return {
    postItems,
    totalItems,
    currentPage,
    divider: DIVIDER,
    setCurrentPage,
    handlePostClick,
  };
};

export default useAdminPostList;
