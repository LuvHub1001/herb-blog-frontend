import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { get } from "../../apis";
import { useFetch } from "../../hooks";
import { Pagination } from "../";
import { PostType } from "../../types";

interface PostFetchResult {
  data: {
    res: PostType[];
    totalCount: number;
    startIndex: number;
    endIndex: number;
  };
  totalPageCount: number;
}

function PostList() {
  const { category } = useParams();
  const divider = 6;

  const [postItem, setPostItem] = useState<PostType[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const postRes = useFetch<string, PostFetchResult>(
    get,
    category && category !== "recent"
      ? `http://localhost:5000/api/boards/${category}/${currentPage}/${divider}`
      : `http://localhost:5000/api/boards/${currentPage}/${divider}`,
  );

  useEffect(() => {
    if (postRes?.data) {
      setPostItem(postRes.data.res ?? []);
      setTotalItems(postRes.data.totalCount ?? 0);
    }
  }, [postRes]);

  return (
    <>
      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-10 mt-3 mb-3 w-[70%] h-180 text-center">
          {postItem.map((item) => (
            <div
              key={item.id}
              className="image-container mt-3 h-87 border-1 border-blue-500 rounded-2xl"
            >
              <div className="flex h-55 justify-center items-center border-b-1">
                <img alt="이미지" src={item.thumbnail || "zz"} />
              </div>
              <div className="info-container text-left pl-3 pt-3 pr-3">
                <div className="flex justify-between">
                  <div>{item.title}</div>
                  <div>{item.writer}</div>
                </div>
                <div>{item.subTitle}</div>
                <div>{item.subContent}</div>
                <div>{item.category}</div>
                <div>{item.workdate}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-30">
        <Pagination
          totalItems={totalItems}
          divider={divider}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}

export default PostList;
