import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchBoards } from "@/apis/BoardFetcher";

const DIVIDER = 20;

const useSearchResult = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useQuery({
    queryKey: ["boards", "search", keyword, currentPage],
    queryFn: () => searchBoards(keyword, currentPage, DIVIDER),
    enabled: !!keyword,
  });

  const paginatedPosts = data?.res ?? [];
  const totalItems = data?.totalCount ?? 0;

  const handlePostClick = (id: number) => {
    navigate(`/posts/detail/${id}`);
  };

  return {
    keyword,
    paginatedPosts,
    totalItems,
    currentPage,
    divider: DIVIDER,
    setCurrentPage,
    handlePostClick,
  };
};

export default useSearchResult;
