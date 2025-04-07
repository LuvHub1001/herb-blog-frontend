import { get } from "../../apis";
import { useFetch } from "../../hooks";
import { PostItem, RenderComponent } from "../";

function PostFetch() {
  const recentItems = useFetch(get, "");
  const tilItems = useFetch(get, "");
  const diaryItems = useFetch(get, "");

  return (
    <div className="flex-col">
      <div className="recent-container mt-10 h-70">
        <div className="text-2xl text-gray-400 font-bold">Recent</div>
        <RenderComponent
          className="recent-render"
          items={[recentItems]}
          render={() => {
            return <PostItem />;
          }}
        />
      </div>

      <div className="til-container mt-35 h-70">
        <div className="text-2xl text-gray-400 font-bold">TIL</div>
        <RenderComponent
          className="til-render"
          items={[tilItems]}
          render={() => {
            return <PostItem />;
          }}
        />
      </div>

      <div className="diary-container mt-35 h-70">
        <span className="text-2xl text-gray-400 font-bold">Diary</span>
        <RenderComponent
          className="diary-render"
          items={[diaryItems]}
          render={() => {
            return <PostItem />;
          }}
        />
      </div>
    </div>
  );
}

export default PostFetch;
