import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNavi } from "../../hooks";

function Navibar() {
  const navigate = useNavigate();
  const { isSearchClick, handleHome, handleSearchButton } = useNavi();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (inputValue.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(inputValue.trim())}`);
    }
  };

  return (
    <>
      <div className="flex sticky top-0 z-[1000] w-full h-20 bg-black text-white justify-between items-center px-4 sm:px-8">
        <div
          className="text-xl sm:text-2xl font-bold cursor-pointer"
          onClick={handleHome}
        >
          Herb Blog
        </div>
        <div className="flex items-center">
          <img
            src="/images/search2.svg"
            alt="돋보기"
            className="w-7 h-7 sm:w-9 sm:h-9 cursor-pointer"
            onClick={handleSearchButton}
          />
        </div>
      </div>

      {isSearchClick && (
        <div
          className="flex fixed inset-0 items-center justify-center bg-black/50 backdrop-blur-sm z-[1001]"
          onClick={handleSearchButton}
        >
          <div
            className="relative rounded-xl p-4 w-[90%] max-w-[500px] bg-white/10 backdrop-blur-lg border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              placeholder="검색어를 입력해주세요"
              className="w-full py-3 pl-4 pr-12 rounded-lg text-base sm:text-lg bg-white/80 placeholder-gray-500 outline-none"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
            />
            <img
              src="/images/search.svg"
              className="absolute top-1/2 right-4 transform -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 cursor-pointer"
              onClick={handleSearchSubmit}
              alt="검색 아이콘"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Navibar;
