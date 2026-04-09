import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useNavi = () => {
  const [isSearchClick, setIsSearchClick] = useState<boolean>(false);

  const navigate = useNavigate();
  const handleHome = () => navigate("/");

  // 검색 모달 토글 (버튼 클릭용)
  const handleSearchToggle = () => {
    setIsSearchClick((prev) => !prev);
  };

  // 모달 바깥 클릭 시 닫기 (backdrop용 — e.target === e.currentTarget 체크)
  const handleBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      setIsSearchClick(false);
    }
  };

  return { isSearchClick, handleHome, handleSearchToggle, handleBackdropClick };
};

export default useNavi;
