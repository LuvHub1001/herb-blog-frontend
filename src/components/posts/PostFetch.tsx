import { NoPost, PostItem, RenderComponent } from "@/components";
import { useMainPosts } from "@/hooks";
import type { BoardListItem } from "@/types";

function PostFetch() {
  const { recentItems, tilItems, diaryItems, handleNavigate } = useMainPosts();

  const renderSection = (
    title: string,
    description: string,
    items: BoardListItem[],
    path: string,
  ) => (
    <section className="mb-14">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2
            className="text-xl font-bold text-slate-800 cursor-pointer hover:text-indigo-600 transition-colors"
            onClick={() => handleNavigate(path)}
          >
            {title}
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">{description}</p>
        </div>
        <button
          className="text-sm text-slate-400 hover:text-indigo-500 font-medium transition-colors shrink-0 cursor-pointer"
          onClick={() => handleNavigate(path)}
        >
          전체 보기 →
        </button>
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 p-5 overflow-x-auto scrollbar-hide">
        {items.length === 0 ? (
          <NoPost />
        ) : (
          <RenderComponent
            className="flex gap-4 min-w-max"
            items={items}
            render={(item) => <PostItem items={item} />}
          />
        )}
      </div>
    </section>
  );

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      {renderSection("Recent", "최근 작성된 글", recentItems, "/posts/recent")}
      {renderSection("TIL", "Today I Learned", tilItems, "/posts/til")}
      {renderSection("Diary", "일상 기록", diaryItems, "/posts/diary")}
    </div>
  );
}

export default PostFetch;
