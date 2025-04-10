import { useRef, useState } from "react";
import "@toast-ui/editor/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { post } from "../../apis";

function PostEditor() {
  const editorRef = useRef<Editor>(null);
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    subTitle: "",
    writer: "LuvHub",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const editorInstance = editorRef.current;
    const content = editorInstance?.getInstance().getMarkdown() || "";

    const postData = {
      ...formData,
      content,
    };

    try {
      post("http://localhost:5000/api/boards", postData);
      alert("게시글이 저장되었습니다!");
      window.location.href = "/";
    } catch (err) {
      alert("게시글 저장에 실패했습니다.");
    }
  };

  return (
    <form action="post" onSubmit={(e) => e.preventDefault()}>
      <div className="title-container flex mt-10 h-55 w-[1500px] m-auto border border-gray-200 rounded-2xl items-center">
        <div className="w-full">
          <div className="category-box flex ml-7 h-13 w-[500px] border border-gray-200 rounded-[8px]">
            <select
              name="category"
              className="w-[500px] pl-1"
              onChange={handleChange}
            >
              <option defaultValue="">카테고리를 선택해 주세요.</option>
              <option value="til">TIL</option>
              <option value="diary">Diary</option>
            </select>
          </div>
          <div className="title-box flex mt-3 pl-7 pr-7">
            <input
              name="subTitle"
              className="bg-gray-200 w-1/2 h-13 text-[18px] rounded-[8px] placeholder: pl-3"
              placeholder="소제목을 입력해 주세요."
              onChange={handleChange}
            />
          </div>
          <div className="title-box flex mt-3 pl-7 pr-7">
            <input
              name="title"
              className="bg-gray-200 w-full h-13 text-[18px] rounded-[8px] placeholder: pl-3"
              placeholder="제목을 입력해 주세요."
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="editor-container w-[1500px] mt-5 mx-auto ">
        <Editor
          ref={editorRef}
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
          onClick={handleSave}
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
