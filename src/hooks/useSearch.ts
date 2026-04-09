import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useSearch = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (inputValue.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(inputValue.trim())}`);
    }
  };

  return { inputValue, handleInputChange, handleSearchSubmit };
};

export default useSearch;
