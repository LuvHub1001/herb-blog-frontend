import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

function AdminPostList() {
  const navigate = useNavigate();

  const divider = 10;

  const [postItem, setPostItem] = useState<PostType[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const postItems = useFetch<string, PostFetchResult>(
    get,
    `${import.meta.env.VITE_API_URL}/boards/${currentPage}/${divider}`,
  );

  useEffect(() => {
    if (postItems?.res) {
      setPostItem(postItems?.res ?? []);
      setTotalItems(postItems.totalCount ?? 0);
    }
  }, [postItems]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="w-full px-6 py-4">
      <div className="hidden md:flex w-full text-center mb-4 font-semibold text-gray-600 text-lg border-b pb-2">
        <p className="flex-1 text-left pl-2">제목</p>
        <p className="flex-1">작성자</p>
        <p className="flex-1">카테고리</p>
        <p className="flex-1">작성일자</p>
      </div>

      {postItem.map((item) => (
        <div
          key={item.id}
          className="flex flex-col md:flex-row border-b border-gray-200 py-3 md:items-center mb-4"
        >
          <div
            onClick={() => navigate(`/posts/detail/${item.id}`)}
            className="flex-1 cursor-pointer text-blue-600 hover:underline font-medium px-4 py-2"
          >
            {item.title}
          </div>

          <div className="flex-1 text-gray-700 px-4 py-2 text-center">
            {item.writer}
          </div>

          <div className="flex-1 text-gray-500 uppercase px-4 py-2 text-center">
            {item.category}
          </div>

          <div className="flex-1 text-gray-500 px-4 py-2 text-center">
            {item.workdate.slice(0, 10)}
          </div>
        </div>
      ))}

      <Pagination
        divider={divider}
        onPageChange={setCurrentPage}
        totalItems={totalItems}
      />
    </div>
  );
}

export default AdminPostList;
