import { useState, useEffect } from "react";
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

  console.log(postItem);

  return (
    <div>
      <div>
        {postItem.map((item) => {
          return (
            <div className="flex justify-between">
              <div>{item.title}</div>
              <div>{item.writer}</div>
              <div>{item.workdate.slice(0, 10)}</div>
            </div>
          );
        })}
      </div>

      <Pagination
        divider={divider}
        totalItems={totalItems}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default AdminPostList;
