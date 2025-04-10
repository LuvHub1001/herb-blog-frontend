import "@toast-ui/editor/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";

function PostEditor() {
  return (
    <form action="post">
      <div className="title-container flex mt-10 h-45 w-[1500px] m-auto border border-gray-200 rounded-2xl items-center">
        <div className="w-full">
          <div className="category-box flex ml-7 h-13 w-[500px] border border-gray-200 rounded-[8px]">
            <select className="w-[500px] pl-1">
              <option defaultValue="">카테고리를 선택해 주세요.</option>
              <option value="til">TIL</option>
              <option value="diary">Diary</option>
            </select>
          </div>
          <div className="title-box flex mt-3 pl-7 pr-7">
            <input
              placeholder="제목을 입력해 주세요."
              className="bg-gray-200 w-full h-13 text-[18px] rounded-[8px] placeholder: pl-3"
            />
          </div>
        </div>
      </div>

      <div className="editor-container w-[1500px] mt-5 mx-auto ">
        <Editor
          initialValue="내용을 입력하세요"
          previewStyle="vertical"
          height="800px"
          initialEditType="markdown"
          useCommandShortcut={true}
        />
      </div>

      <div className="mt-10 flex button-container gap-3 float-right mr-50">
        <button
          type="button"
          className="w-20 h-10 bg-blue-300 rounded-[8px] cursor-pointer"
        >
          저장
        </button>
        <button
          type="button"
          className="w-20 h-10 bg-gray-300 rounded-[8px] cursor-pointer"
        >
          취소
        </button>
      </div>
    </form>
  );
}

export default PostEditor;
