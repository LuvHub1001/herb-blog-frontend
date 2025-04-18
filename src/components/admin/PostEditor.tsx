import { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import "prismjs/themes/prism.css";
import Prism from "prismjs";
import { get, post, patch } from "../../apis";

function PostEditor() {
  const editorRef = useRef<Editor>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    writer: "LuvHub",
    category: "",
    subTitle: "",
    title: "",
  });

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [existingThumbnail, setExistingThumbnail] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
    }
  };

  const handleSave = async () => {
    const editorInstance = editorRef.current;
    const content = editorInstance?.getInstance().getMarkdown() || "";

    let thumbnailUrl = existingThumbnail;

    if (thumbnailFile) {
      const imageForm = new FormData();
      imageForm.append("image", thumbnailFile);

      try {
        const response: any = await post(
          "http://localhost:4000/upload",
          imageForm,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
        thumbnailUrl = response.url;
      } catch (error) {
        console.error("썸네일 업로드 실패:", error);
        alert("썸네일 업로드에 실패했습니다.");
        return;
      }
    }

    const postData = {
      ...formData,
      content,
      thumbnail: thumbnailUrl,
    };

    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      if (id) {
        await patch(`http://localhost:5000/api/boards/${id}`, postData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        alert("게시글이 수정되었습니다!");
      } else {
        await post("http://localhost:5000/api/boards", postData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        alert("게시글이 저장되었습니다!");
      }

      navigate("/");
    } catch (error) {
      console.error("저장 실패:", error);
      alert("게시글 저장에 실패했습니다.");
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      try {
        const response: any = await get(
          `http://localhost:5000/api/boards/detail/${id}`,
        );
        setFormData({
          writer: response.writer,
          category: response.category,
          subTitle: response.subTitle,
          title: response.title,
        });
        setExistingThumbnail(response.thumbnail || "");
        editorRef.current?.getInstance().setMarkdown(response.content);
      } catch (error) {
        alert("게시글 로딩 실패");
      }
    };

    fetchPost();
  }, [id]);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="title-container flex mt-10 h-65 w-[1500px] m-auto border border-gray-200 rounded-2xl items-center">
        <div className="w-full">
          <div className="category-box flex ml-7 h-13 w-[500px] border border-gray-200 rounded-[8px]">
            <select
              name="category"
              className="w-[500px] pl-1"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">카테고리를 선택해 주세요.</option>
              <option value="til">TIL</option>
              <option value="diary">Diary</option>
            </select>
          </div>

          <div className="title-box flex mt-3 pl-7 pr-7">
            <input
              name="subTitle"
              className="bg-gray-200 w-1/2 h-13 text-[18px] rounded-[8px] pl-3"
              placeholder="소제목을 입력해 주세요."
              value={formData.subTitle}
              onChange={handleChange}
            />
          </div>

          <div className="title-box flex mt-3 pl-7 pr-7">
            <input
              name="title"
              className="bg-gray-200 w-full h-13 text-[18px] rounded-[8px] pl-3"
              placeholder="제목을 입력해 주세요."
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="thumbnail-box flex pt-4 pl-8 pr-7 gap-4 items-center">
            <label className="font-bold text-gray-600">썸네일:</label>
            <input
              type="file"
              className="border-1 rounded file:bg-black file:text-white file:cursor-pointer"
              accept="image/*"
              onChange={handleThumbnailSelect}
            />
            {existingThumbnail && !thumbnailFile && (
              <img
                src={existingThumbnail}
                alt="기존 썸네일"
                className="w-20 h-14 rounded"
              />
            )}
          </div>
        </div>
      </div>

      <div className="editor-container w-[1500px] mt-5 mx-auto">
        <Editor
          ref={editorRef}
          initialValue="내용을 입력하세요"
          previewStyle="vertical"
          height="800px"
          initialEditType="markdown"
          useCommandShortcut={true}
          plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
        />
      </div>

      <div className="flex button-container gap-3 float-right mt-10 mb-30 mr-50">
        <button
          type="button"
          className="w-20 h-10 bg-blue-300 rounded-[8px] cursor-pointer"
          onClick={handleSave}
        >
          저장
        </button>
      </div>
    </form>
  );
}

export default PostEditor;
