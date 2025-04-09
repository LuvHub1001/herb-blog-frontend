import { useNavigate } from "react-router-dom";
import { get } from "../../apis";
import { useFetch } from "../../hooks";
import { PostItem, RenderComponent } from "../";
import { PostType, Nullable } from "../../types";

interface PostFetchResult {
  data: Nullable<PostType[]>;
  totalPageCount: number;
}
function PostFetch() {
  const navigate = useNavigate();

  const recentItems = useFetch<string, PostFetchResult>(
    get,
    "http://localhost:5000/api/boards/main-recent",
  );
  const tilItems = useFetch<string, PostFetchResult>(
    get,
    "http://localhost:5000/api/boards/main-til",
  );
  const diaryItems = useFetch<string, PostFetchResult>(
    get,
    "http://localhost:5000/api/boards/main-diary",
  );

  const recentMainItems = recentItems?.data ?? [];
  const tilMainItems = tilItems?.data ?? [];
  const diaryMainItems = diaryItems?.data ?? [];

  return (
    <div>
      <div className="recent-container mt-10 h-70">
        <div className="text-2xl text-gray-400 font-bold">
          <span
            className="cursor-pointer"
            onClick={() => navigate("/posts/recent")}
          >
            Recent
          </span>
        </div>
        <RenderComponent
          className="recent-render grid grid-cols-4 gap-10 mr-3"
          items={recentMainItems}
          render={(item) => {
            return <PostItem items={item} />;
          }}
        />
      </div>

      <div className="til-container mt-35 h-70">
        <div className="text-2xl text-gray-400 font-bold">
          <span
            className="cursor-pointer"
            onClick={() => navigate("/posts/til")}
          >
            TIL
          </span>
        </div>
        <RenderComponent
          className="til-render grid grid-cols-4 gap-10 mr-3"
          items={tilMainItems}
          render={(item) => {
            return <PostItem items={item} />;
          }}
        />
      </div>

      <div className="diary-container mt-35 h-70">
        <div className="text-2xl text-gray-400 font-bold">
          <span
            className="cursor-pointer"
            onClick={() => navigate("/posts/diary")}
          >
            Diary
          </span>
        </div>
        <RenderComponent
          className="diary-render grid grid-cols-4 gap-10 mr-3"
          items={diaryMainItems}
          render={(item) => {
            return <PostItem items={item} />;
          }}
        />
      </div>
    </div>
  );
}

export default PostFetch;
