import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { get } from "../../apis";
import { useFetch } from "../../hooks";
import { Pagination } from "../";
import { PostType } from "../../types";

interface PostFetchResult {
  res: PostType[];
  totalCount: number;
  startIndex: number;
  endIndex: number;
  totalPageCount: number;
}

function PostList() {
  const navigate = useNavigate();
  const { category } = useParams();
  const divider = 8;

  const [postItem, setPostItem] = useState<PostType[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const markdownRegex = (markdown: string) => {
    return markdown
      .replace(/!\[.*?\]\(.*?\)/g, "")
      .replace(/\[.*?\]\(.*?\)/g, "")
      .replace(/[#>*_\-\+~`]/g, "")
      .replace(/\n+/g, " ")
      .trim();
  };

  const postItems = useFetch<string, PostFetchResult>(
    get,
    category && category !== "recent"
      ? `http://localhost:5000/api/boards/${category}/${currentPage}/${divider}`
      : `http://localhost:5000/api/boards/${currentPage}/${divider}`,
  );

  useEffect(() => {
    if (postItems?.res) {
      setPostItem(postItems.res ?? []);
      setTotalItems(postItems.totalCount ?? 0);
    }
  }, [postItems]);

  return (
    <div className="px-6 py-10 bg-gray-50 min-h-screen">
      <div className="text-3xl font-bold text-gray-700 mb-6 ml-4 uppercase">
        {category}
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {postItem.map((item) => (
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
                {item.workdate.slice(0, 10)}
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

export default PostList;
