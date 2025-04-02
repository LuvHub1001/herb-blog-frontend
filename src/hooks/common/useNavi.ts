import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useNavi = () => {
  const [isSearchClick, setIsSearchClick] = useState<boolean>(false);

  const navigate = useNavigate();
  const handleHome = () => navigate("/");

  const handleSearchButton = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsSearchClick((prev: boolean) => !prev);
    }
  };

  return { isSearchClick, handleHome, handleSearchButton };
};

export default useNavi;
