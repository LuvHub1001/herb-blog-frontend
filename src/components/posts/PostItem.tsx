import { useNavigate } from "react-router-dom";
import { PostType } from "../../types";

interface itemsType {
  items: PostType;
}

function PostItem({ items }: itemsType) {
  const navigate = useNavigate();

  const markdownRegex = (markdown: string) => {
    return markdown
      .replace(/!\[.*?\]\(.*?\)/g, "") // 이미지 제거
      .replace(/\[.*?\]\(.*?\)/g, "") // 링크 제거
      .replace(/[#>*_\-\+~`]/g, "") // 특수문자 제거
      .replace(/\n+/g, " ") // 줄바꿈 -> 공백
      .trim();
  };

  return (
    <>
      <div className="mt-3 h-90 w-90 border-1 rounded-2xl">
        <div className="image-container flex w-full h-50 border-b-1">
          <img
            alt="이미지"
            src={items.thumbnail || "/images/default_thumbnail.jpg"}
            className="w-full h-full cursor-pointer rounded-t-2xl"
            onClick={() => navigate(`/posts/detail/${items.id}`)}
          />
        </div>
        <div className="pt-2 flex flex-col">
          <div className="pl-2 text-[20px] font-bold">
            <span
              className="cursor-pointer hover:border-b-1"
              onClick={() => navigate(`/posts/detail/${items.id}`)}
            >
              {items.title.length > 22
                ? items.title.slice(0, 22) + "..."
                : items.title}
            </span>
          </div>
          <div className="flex justify-between items-center pt-2 pl-2 ">
            <span
              className="cursor-pointer text-gray-700"
              onClick={() => navigate(`/posts/detail/${items.id}`)}
            >
              {items.subTitle}
            </span>
            <span className="pr-1 text-gray-700">{items.writer}</span>
          </div>

          <div
            className="pt-2 pl-2 cursor-pointer"
            onClick={() => navigate(`/posts/detail/${items.id}`)}
          >
            <span className="hover:border-b-1">
              {markdownRegex(items.content).length > 40
                ? markdownRegex(items.content).slice(0, 40) + "..."
                : markdownRegex(items.content)}
            </span>
          </div>
          <div className="pt-2 pl-2 text-gray-400 italic">
            {items.workdate.slice(0, 10)}
          </div>
        </div>
      </div>
    </>
  );
}

export default PostItem;
