import { useNavigate } from "react-router-dom";
import { get } from "../../apis";
import { useFetch } from "../../hooks";
import { NoPost, PostItem, RenderComponent } from "../";
import { PostType } from "../../types";

function PostFetch() {
  const navigate = useNavigate();

  const recentItems = useFetch<string, PostType[]>(
    get,
    `${import.meta.env.VITE_API_URL}/boards/main-recent`,
  );
  const tilItems = useFetch<string, PostType[]>(
    get,
    `${import.meta.env.VITE_API_URL}/boards/main-til`,
  );
  const diaryItems = useFetch<string, PostType[]>(
    get,
    `${import.meta.env.VITE_API_URL}/boards/main-diary`,
  );

  const recentMainItems = recentItems ?? [];
  const tilMainItems = tilItems ?? [];
  const diaryMainItems = diaryItems ?? [];

  const renderSection = (title: string, items: PostType[], path: string) => (
    <div className="mb-20">
      <div className="mb-4 flex items-center justify-between">
        <h2
          className="text-2xl font-bold text-gray-700 cursor-pointer hover:text-blue-500 transition"
          onClick={() => navigate(path)}
        >
          {title.toUpperCase()}
        </h2>
        <span
          className="text-sm text-blue-500 hover:underline cursor-pointer"
          onClick={() => navigate(path)}
        >
          전체 보기 &rarr;
        </span>
      </div>
      <div className="bg-white rounded-2xl shadow p-4 overflow-x-auto scrollbar-hide">
        {items.length === 0 ? (
          <NoPost />
        ) : (
          <RenderComponent
            className="flex gap-6 min-w-max"
            items={items}
            render={(item) => <PostItem items={item} />}
          />
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className="px-6 py-10 bg-gray-50 min-h-screen -ml-14 sm:ml-0">
        {renderSection("recent", recentMainItems, "/posts/recent")}
        {renderSection("til", tilMainItems, "/posts/til")}
        {renderSection("diary", diaryMainItems, "/posts/diary")}
      </div>
    </>
  );
}

export default PostFetch;
