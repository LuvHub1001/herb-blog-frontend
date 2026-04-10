import { useEffect, useRef } from "react";
import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { usePostEditor } from "@/hooks";

function PostEditor() {
  const {
    formData,
    initialContent,
    isReady,
    thumbnailFile,
    existingThumbnail,
    handleChange,
    handleThumbnailSelect,
    uploadImageFile,
    handleSave,
    handleSubmit,
  } = usePostEditor();

  // Toast UI는 React 19 호환 래퍼가 없어서 vanilla 패키지를 직접 마운트한다.
  // 본문은 에디터 내부 state에 두고, 저장 시점에 인스턴스에서 한 번만 읽는다 (입력 지연 방지).
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<Editor | null>(null);

  useEffect(() => {
    if (!isReady || !editorContainerRef.current) return;

    const editor = new Editor({
      el: editorContainerRef.current,
      initialValue: initialContent,
      previewStyle: "vertical", // 좌: 마크다운 / 우: 미리보기 (split-view)
      height: "700px",
      initialEditType: "markdown",
      useCommandShortcut: true,
      placeholder: "내용을 입력하세요",
      hooks: {
        addImageBlobHook: async (blob, callback) => {
          try {
            const file =
              blob instanceof File
                ? blob
                : new File([blob], "image.png", { type: blob.type });
            const url = await uploadImageFile(file);
            callback(url, "");
          } catch {
            // uploadImageFile 내부에서 toast.error 처리
          }
        },
      },
    });

    editorInstanceRef.current = editor;

    return () => {
      editor.destroy();
      editorInstanceRef.current = null;
    };
    // initialContent는 isReady가 true가 되는 시점에 확정되므로 의도적으로 의존성에서 제외.
    // 포함하면 입력 도중 에디터가 재마운트될 위험이 있음.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, uploadImageFile]);

  const onClickSave = () => {
    const md = editorInstanceRef.current?.getMarkdown() ?? "";
    handleSave(md);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl border border-slate-100 p-6 space-y-4">
        <select
          name="category"
          className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition cursor-pointer"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">카테고리를 선택해 주세요.</option>
          <option value="til">TIL</option>
          <option value="diary">Diary</option>
        </select>

        <input
          name="subTitle"
          className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          placeholder="소제목을 입력해 주세요."
          value={formData.subTitle}
          onChange={handleChange}
        />

        <input
          name="title"
          className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 text-base font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          placeholder="제목을 입력해 주세요."
          value={formData.title}
          onChange={handleChange}
        />

        <div className="flex items-center gap-4 flex-col sm:flex-row">
          <label className="hidden sm:block text-sm font-medium text-slate-500 min-w-[70px]">
            썸네일
          </label>
          <input
            type="file"
            className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100 file:cursor-pointer transition"
            accept="image/*"
            onChange={handleThumbnailSelect}
          />
          {existingThumbnail && !thumbnailFile && (
            <img
              src={existingThumbnail}
              alt="기존 썸네일"
              className="w-20 h-14 rounded-lg object-cover border border-slate-200"
            />
          )}
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white overflow-hidden">
        {isReady ? (
          <div ref={editorContainerRef} />
        ) : (
          <div className="min-h-[700px] flex items-center justify-center text-slate-400 text-sm">
            불러오는 중...
          </div>
        )}
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="px-8 py-3 text-sm font-semibold text-white bg-indigo-500 hover:bg-indigo-600 rounded-xl transition-colors shadow-sm cursor-pointer"
          onClick={onClickSave}
        >
          저장
        </button>
      </div>
    </form>
  );
}

export default PostEditor;
