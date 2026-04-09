import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getMainRecent, getMainTil, getMainDiary } from "@/apis/BoardFetcher";

const useMainPosts = () => {
  const navigate = useNavigate();

  const { data: recentItems = [] } = useQuery({
    queryKey: ["boards", "main-recent"],
    queryFn: getMainRecent,
  });

  const { data: tilItems = [] } = useQuery({
    queryKey: ["boards", "main-til"],
    queryFn: getMainTil,
  });

  const { data: diaryItems = [] } = useQuery({
    queryKey: ["boards", "main-diary"],
    queryFn: getMainDiary,
  });

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return { recentItems, tilItems, diaryItems, handleNavigate };
};

export default useMainPosts;
