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
    <div className="w-[280px] h-[370px] bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden flex flex-col">
      <div className="h-[160px] overflow-hidden">
        <img
          alt="썸네일"
          src={items.thumbnail || "/images/default_thumbnail.jpg"}
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => navigate(`/posts/detail/${items.id}`)}
        />
      </div>

      <div className="p-4 flex flex-col justify-between flex-1">
        <div className="flex flex-col gap-2">
          <h3
            className="text-lg font-bold text-gray-800 cursor-pointer hover:text-blue-500 transition line-clamp-1"
            onClick={() => navigate(`/posts/detail/${items.id}`)}
          >
            {items.title}
          </h3>

          <div className="flex justify-between items-center text-sm text-gray-600">
            <span
              className="truncate max-w-[70%] cursor-pointer"
              onClick={() => navigate(`/posts/detail/${items.id}`)}
            >
              {items.subTitle}
            </span>
            <span className="text-gray-500">{items.writer}</span>
          </div>

          <p
            className="text-sm text-gray-700 cursor-pointer hover:text-blue-500 transition line-clamp-2"
            onClick={() => navigate(`/posts/detail/${items.id}`)}
          >
            {markdownRegex(items.content)}
          </p>
        </div>

        <div className="text-xs text-gray-400 italic mt-2">
          {items.workdate.slice(0, 10)}
        </div>
      </div>
    </div>
  );
}

export default PostItem;
