import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBoards } from "@/apis/BoardFetcher";

const DIVIDER = 8;

const usePostList = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useQuery({
    queryKey: ["boards", "list", category, currentPage],
    queryFn: () =>
      getBoards(
        currentPage,
        DIVIDER,
        category === "recent" ? undefined : category,
      ),
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
    category,
    postItems,
    totalItems,
    currentPage,
    divider: DIVIDER,
    setCurrentPage,
    handlePostClick,
  };
};

export default usePostList;
