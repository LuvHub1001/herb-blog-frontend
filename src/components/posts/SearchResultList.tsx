import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { get } from "../../apis";
import { PostType } from "../../types";
import { Pagination } from "../";
import { useFetch } from "../../hooks";

function SearchResultList() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const divider = 8;

  const searchResult = useFetch<string, PostType[]>(
    get,
    `http://localhost:5000/api/boards/search?keyword=${encodeURIComponent(
      keyword,
    )}`,
  );

  useEffect(() => {
    if (searchResult) {
      setPosts(searchResult);
      setTotalItems(searchResult.length);
    }
  }, [searchResult]);

  const markdownRegex = (markdown: string) => {
    return markdown
      .replace(/!\[.*?\]\(.*?\)/g, "")
      .replace(/\[.*?\]\(.*?\)/g, "")
      .replace(/[#>*_\-\+~`]/g, "")
      .replace(/\n+/g, " ")
      .trim();
  };

  const paginatedPosts = posts.slice(
    (currentPage - 1) * divider,
    currentPage * divider,
  );

  return (
    <div className="px-6 py-10 bg-gray-50 min-h-screen">
      <div className="text-3xl font-bold text-gray-700 mb-6 ml-4">
        '{keyword}' 검색 결과
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {paginatedPosts.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden flex flex-col h-[370px]"
          >
            <div className="h-[180px] overflow-hidden">
              <img
                src={item.thumbnail || "/images/default_thumbnail.jpg"}
                alt="썸네일"
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => navigate(`/posts/detail/${item.id}`)}
              />
            </div>
            <div className="p-4 flex flex-col justify-between flex-1">
              <div className="flex flex-col gap-2">
                <h3
                  className="text-lg font-semibold cursor-pointer hover:text-blue-500 transition line-clamp-1"
                  onClick={() => navigate(`/posts/detail/${item.id}`)}
                >
                  {item.title}
                </h3>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span className="truncate max-w-[70%]">{item.subTitle}</span>
                  <span>{item.writer}</span>
                </div>
                <p
                  className="text-sm text-gray-700 cursor-pointer hover:text-blue-500 line-clamp-2"
                  onClick={() => navigate(`/posts/detail/${item.id}`)}
                >
                  {markdownRegex(item.content)}
                </p>
              </div>
              <span className="text-xs italic text-gray-400 mt-2">
                {item.workdate?.slice(0, 10)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <Pagination
          totalItems={totalItems}
          divider={divider}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default SearchResultList;
