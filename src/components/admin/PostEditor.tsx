import { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import "prismjs/themes/prism.css";
import Prism from "prismjs";
import imageCompression from "browser-image-compression";
import { get, post, patch } from "../../apis";

function PostEditor() {
  const editorRef = useRef<Editor>(null);
  const isMobile = window.innerWidth <= 768;

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

    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (!formData.category) {
      alert("카테고리를 선택해 주세요.");
      return;
    }

    if (!formData.subTitle) {
      alert("소제목을 입력해 주세요.");
      const subTitleInput = document.querySelector(
        'input[name="subTitle"]',
      ) as HTMLInputElement;
      subTitleInput?.focus();
      return;
    }

    if (!formData.title) {
      alert("제목을 입력해 주세요.");
      const titleInput = document.querySelector(
        'input[name="title"]',
      ) as HTMLInputElement;
      titleInput?.focus();
      return;
    }

    if (!content.trim()) {
      alert("본문 내용을 작성해 주세요.");
      editorRef.current?.getInstance().focus();
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
      <div className="flex flex-col mt-10 w-full max-w-[1520px] mx-auto border border-gray-200 rounded-2xl p-4">
        <div className="w-full">
          <div className="flex mb-4">
            <select
              name="category"
              className="w-full border border-gray-200 rounded-md px-2 py-2"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">카테고리를 선택해 주세요.</option>
              <option value="til">TIL</option>
              <option value="diary">Diary</option>
            </select>
          </div>

          <div className="flex mb-4">
            <input
              name="subTitle"
              className="w-full bg-gray-200 h-12 text-[18px] rounded-md px-3"
              placeholder="소제목을 입력해 주세요."
              value={formData.subTitle}
              onChange={handleChange}
            />
          </div>

          <div className="flex mb-4">
            <input
              name="title"
              className="w-full bg-gray-200 h-12 text-[18px] rounded-md px-3"
              placeholder="제목을 입력해 주세요."
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center gap-4 mb-4 flex-col sm:flex-row">
            {isMobile ? null : (
              <label className="font-bold text-gray-600 min-w-[80px] sm:text-right">
                썸네일:
              </label>
            )}

            <input
              type="file"
              className="border rounded file:bg-black file:text-white file:cursor-pointer"
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

      <div className="w-full max-w-[1550px] mt-5 mx-auto px-4">
        <Editor
          ref={editorRef}
          initialValue="내용을 입력하세요"
          previewStyle="vertical"
          height="800px"
          initialEditType={isMobile ? "wysiwyg" : "markdown"}
          useCommandShortcut={true}
          plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
          hooks={{
            addImageBlobHook: async (
              blob: Blob,
              callback: (url: string, altText?: string) => void,
            ): Promise<void> => {
              try {
                const file = new File([blob], "image.jpg", { type: blob.type });

                const options = {
                  maxSizeMB: 1,
                  maxWidthOrHeight: 600,
                  useWebWorker: true,
                };

                const resizedFile = await imageCompression(file, options);

                const formData = new FormData();
                formData.append("image", resizedFile);

                const response: any = await post(
                  "http://localhost:4000/upload",
                  formData,
                  {
                    headers: { "Content-Type": "multipart/form-data" },
                  },
                );

                callback(response.url, "image");
              } catch (error) {
                console.error("이미지 업로드 실패:", error);
                alert("이미지 업로드에 실패했습니다.");
              }
            },
          }}
        />
      </div>

      <div className="w-full max-w-[1550px] mx-auto px-4 flex justify-end mt-10 mb-16">
        <button
          type="button"
          className="w-24 h-10 bg-blue-300 rounded-md cursor-pointer"
          onClick={handleSave}
        >
          저장
        </button>
      </div>
    </form>
  );
}

export default PostEditor;
