import { useEffect, useRef } from "react";
import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "@/css/PostView.css";
import { usePostView } from "@/hooks";

function PostView() {
  const {
    postData,
    isAdmin,
    showDeleteConfirm,
    handleEdit,
    handleRemoveClick,
    handleRemoveConfirm,
    handleRemoveCancel,
    handleGoBack,
  } = usePostView();

  // Toast UI Viewer를 vanilla로 마운트한다 (React 19 호환 래퍼 없음).
  // PostEditor의 미리보기와 동일한 렌더러라 결과물이 일치한다.
  const viewerContainerRef = useRef<HTMLDivElement>(null);
  const viewerInstanceRef = useRef<Viewer | null>(null);

  useEffect(() => {
    if (!postData || !viewerContainerRef.current) return;

    const viewer = new Viewer({
      el: viewerContainerRef.current,
      initialValue: postData.content,
    });
    viewerInstanceRef.current = viewer;

    return () => {
      viewer.destroy();
      viewerInstanceRef.current = null;
    };
  }, [postData]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {postData ? (
        <>
          <div className="mb-8">
            <span className="inline-block px-3 py-1 text-[11px] font-semibold text-indigo-600 bg-indigo-50 rounded-full uppercase tracking-wider mb-4">
              {postData.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
              {postData.title}
            </h1>
            <p className="text-lg text-slate-400 mt-2">{postData.subTitle}</p>
            <div className="flex items-center gap-2 mt-5 text-sm text-slate-400">
              <span className="font-medium text-slate-500">{postData.writer}</span>
              <span>·</span>
              <span>{postData.workdate.slice(0, 10)}</span>
              <span>·</span>
              <span>조회 {postData.viewCount}</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-10">
            <div ref={viewerContainerRef} />
          </div>
        </>
      ) : (
        <div className="text-center py-32 text-slate-400">
          <div className="w-8 h-8 mx-auto mb-4 border-2 border-slate-200 border-t-indigo-500 rounded-full animate-spin" />
          게시글을 불러오는 중입니다
        </div>
      )}

      <div className="flex gap-2 justify-end mt-8">
        {isAdmin && (
          <>
            <button
              type="button"
              className="px-5 py-2.5 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors cursor-pointer"
              onClick={handleEdit}
            >
              수정
            </button>
            <button
              type="button"
              className="px-5 py-2.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
              onClick={handleRemoveClick}
            >
              삭제
            </button>
          </>
        )}
        <button
          type="button"
          className="px-5 py-2.5 text-sm font-medium text-slate-500 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          onClick={handleGoBack}
        >
          목록으로
        </button>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-[1100]">
          <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 p-6 w-[340px]">
            <p className="text-base font-semibold text-slate-800 mb-2">
              게시글 삭제
            </p>
            <p className="text-sm text-slate-500 mb-6">
              정말 이 게시글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </p>
            <div className="flex gap-2 justify-end">
              <button
                className="px-4 py-2 text-sm font-medium text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                onClick={handleRemoveCancel}
              >
                취소
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors cursor-pointer"
                onClick={handleRemoveConfirm}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostView;
