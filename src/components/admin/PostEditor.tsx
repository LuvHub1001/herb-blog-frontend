import { useRef, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { usePostEditor } from "@/hooks";

function PostEditor() {
  const {
    formData,
    content,
    thumbnailFile,
    existingThumbnail,
    handleChange,
    handleContentChange,
    handleThumbnailSelect,
    handleImageUpload,
    handleSave,
    handleSubmit,
  } = usePostEditor();

  const imageInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleImageButtonClick = () => {
    imageInputRef.current?.click();
  };

  const handleImageFileSelect = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const dt = new DataTransfer();
    dt.items.add(file);
    const markdown = await handleImageUpload(dt);
    if (markdown) {
      handleContentChange(content + "\n" + markdown);
    }
    e.target.value = "";
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      const markdown = await handleImageUpload(e.dataTransfer);
      if (markdown) {
        handleContentChange(content + "\n" + markdown);
      }
    }
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

      <div
        className={`mt-6 relative rounded-xl transition-all ${isDragging ? "ring-2 ring-indigo-500 ring-offset-2" : ""}`}
        data-color-mode="light"
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        {isDragging && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-indigo-50/80 rounded-xl border-2 border-dashed border-indigo-400 pointer-events-none">
            <p className="text-indigo-600 font-medium">이미지를 놓아주세요</p>
          </div>
        )}

        <div className="flex items-center gap-2 mb-2">
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-500 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
            onClick={handleImageButtonClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            이미지 첨부
          </button>
          <span className="text-[11px] text-slate-400">
            또는 이미지를 드래그하여 놓아주세요
          </span>
        </div>

        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageFileSelect}
        />

        <MDEditor
          value={content}
          onChange={handleContentChange}
          height={700}
          preview="edit"
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="px-8 py-3 text-sm font-semibold text-white bg-indigo-500 hover:bg-indigo-600 rounded-xl transition-colors shadow-sm cursor-pointer"
          onClick={handleSave}
        >
          저장
        </button>
      </div>
    </form>
  );
}

export default PostEditor;
