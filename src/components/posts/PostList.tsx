import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const markdownRegex = (markdown: string) => {
    return markdown
      .replace(/!\[.*?\]\(.*?\)/g, "") // 이미지 제거
      .replace(/\[.*?\]\(.*?\)/g, "") // 링크 제거
      .replace(/[#>*_\-\+~`]/g, "") // 특수문자 제거
      .replace(/\n+/g, " ") // 줄바꿈 -> 공백
      .trim();
  };

  const { category } = useParams();
  const divider = 8;

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
      <div className="text-2xl text-gray-400 font-bold ml-48 mt-10 ">
        {category?.toUpperCase()}
      </div>
      <div className="flex w-full h-auto justify-center">
        <div className="grid grid-cols-4 gap-5 mt-5 mb-3 w-[80%] h-180 text-center">
          {postItem.map((item) => (
            <div
              key={item.id}
              className="image-container  h-95 border-1 border-black rounded-2xl"
            >
              <div className="flex h-55 justify-center border-b-1">
                <img
                  alt="이미지"
                  src={item.thumbnail || "/images/default_thumbnail.jpg"}
                  className="h-55 w-full rounded-t-2xl cursor-pointer"
                  onClick={() => navigate(`/posts/detail/${item.id}`)}
                />
              </div>
              <div className="info-container text-left pl-3 pt-3 pr-3">
                <div className="flex justify-between ">
                  <div className="font-bold cursor-pointer text-[18px]">
                    <span
                      className="hover:border-b-1"
                      onClick={() => navigate(`/posts/detail/${item.id}`)}
                    >
                      {item.title.length > 30
                        ? item.title.slice(0, 28) + "..."
                        : item.title}
                    </span>
                  </div>
                </div>
                <div className="flex pt-3 justify-between items-center">
                  <span>{item.subTitle}</span>
                  <span>{item.writer}</span>
                </div>
                <span className="pt-2 cursor-pointer hover:border-b-1">
                  {markdownRegex(item.content).length > 40
                    ? markdownRegex(item.content).slice(0, 40) + "..."
                    : markdownRegex(item.content)}
                </span>
                <div className="pt-1 italic text-gray-400">
                  {item.workdate.slice(0, 10)}
                </div>
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
