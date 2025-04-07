import { useNavi } from "../../hooks";

function Navibar() {
  const { isSearchClick, handleHome, handleSearchButton } = useNavi();

  return (
    <>
      <div className="flex sticky top-0 z-10 w-screen h-20 bg-black text-white justify-between items-center">
        <div
          className="text-2xl font-bold ml-5 cursor-pointer"
          onClick={handleHome}
        >
          Herb Blog
        </div>
        <div className="">
          <img
            src="/images/search2.svg"
            alt="돋보기"
            className="size-10 cursor-pointer"
            onClick={handleSearchButton}
          />
        </div>
      </div>

      {isSearchClick && (
        <div
          className="flex fixed inset-0 items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={handleSearchButton}
        >
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <input
              type="text"
              placeholder="검색어를 입력해주세요"
              className="border p-2 rounded-md w-150 h-15 text-[18px] placeholder:pl-3"
            />
            <img
              src="/images/search.svg"
              className="absolute top-115 right-168 w-8 cursor-pointer"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Navibar;
