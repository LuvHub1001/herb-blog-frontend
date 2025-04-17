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
    `http://localhost:5000/api/boards/${currentPage}/${divider}`,
  );

  useEffect(() => {
    if (postItems?.res) {
      setPostItem(postItems?.res ?? []);
      setTotalItems(postItems.totalCount ?? 0);
    }
  }, [postItems]);

  return (
    <div>
      <div className="mb-15 min-h-155">
        <div className="flex w-full justify-between text-center mb-5 font-bold text-2xl text-gray-500">
          <p className="w-120">제목</p>
          <p className="w-120">작성자</p>
          <p className="w-100">카테고리</p>
          <p className="w-auto">작성일자</p>
        </div>
        {postItem.map((item) => {
          return (
            <div
              className="flex border-b border-gray-300 items-center"
              key={item.id}
            >
              <div
                className="flex w-120 h-15 items-center"
                onClick={() => navigate(`/posts/detail/${item.id}`)}
              >
                <span className="cursor-pointer hover:text-blue-500 ">
                  {item.title}
                </span>
              </div>
              <div className="flex w-120 justify-center items-center">
                <span>{item.writer}</span>
              </div>
              <div className="flex w-100 justify-center items-center">
                <span>{item.category.toUpperCase()}</span>
              </div>
              <div className="flex w-auto justify-center items-center">
                <span>{item.workdate.slice(0, 10)}</span>
              </div>
            </div>
          );
        })}
      </div>

      <Pagination
        divider={divider}
        onPageChange={setCurrentPage}
        totalItems={totalItems}
      />
    </div>
  );
}

export default AdminPostList;
