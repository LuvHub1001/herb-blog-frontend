import { useNavigate } from "react-router-dom";
import type { BoardListItem } from "@/types";

interface PostItemProps {
  items: BoardListItem;
}

function PostItem({ items }: PostItemProps) {
  const navigate = useNavigate();
  const goDetail = () => navigate(`/posts/detail/${items.id}`);

  return (
    <div
      className="w-[260px] bg-white rounded-xl border border-slate-100 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer group"
      onClick={goDetail}
    >
      <div className="h-[150px] overflow-hidden bg-slate-100">
        <img
          alt="썸네일"
          src={items.thumbnail || "/images/default_thumbnail.svg"}
          width={260}
          height={150}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <span className="text-[11px] font-semibold text-indigo-500 uppercase tracking-wider mb-1.5">
          {items.category}
        </span>
        <h3 className="text-[15px] font-semibold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
          {items.title}
        </h3>
        <p className="text-[13px] text-slate-400 line-clamp-2 mt-1.5 leading-relaxed flex-1">
          {items.subContent}
        </p>
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-50 text-[12px] text-slate-400">
          <span>{items.writer}</span>
          <span className="text-slate-200">·</span>
          <span>{items.workdate.slice(0, 10)}</span>
        </div>
      </div>
    </div>
  );
}

export default PostItem;
