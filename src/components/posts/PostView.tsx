import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Viewer } from "@toast-ui/react-editor";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import "../../css/PostView.css";
import { get, remove } from "../../apis";
import { useFetch } from "../../hooks";
import { PostType } from "../../types";

interface VerifyResponse {
  message: string;
  user?: {
    id: string;
    role: string;
    email: string;
  };
}

function PostView() {
  const token = sessionStorage.getItem("token");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate();

  const data = useFetch<string, VerifyResponse>(
    get,
    token ? "http://localhost:5000/api/auth/verify" : "",
    token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : undefined,
  );

  useEffect(() => {
    if (data && data.message === "토큰 유효" && data.user?.role === "super") {
      setIsAdmin(true);
    } else if (data?.message !== "토큰 유효") {
      setIsAdmin(false);
    }
  }, [data]);

  const handleRemove = async () => {
    const confirmDelete = window.confirm("정말 이 게시글을 삭제하시겠습니까?");
    if (!confirmDelete || !id) return;

    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      await remove(`http://localhost:5000/api/boards/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("게시글이 삭제되었습니다.");
      window.location.href = "/";
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("게시글 삭제에 실패했습니다.");
    }
  };

  const { id } = useParams();
  const response = useFetch<string, PostType>(
    get,
    `http://localhost:5000/api/boards/detail/${id}`,
  );

  const postData = response ?? null;

  useEffect(() => {
    const viewedKey = `viewed-post-${id}`;
    const viewed = sessionStorage.getItem(viewedKey);

    if (!viewed) {
      get(`http://localhost:5000/api/boards/detail/${id}`);
      sessionStorage.setItem(viewedKey, "true");
    }
  }, [id]);

  const handleEdit = () => {
    navigate(`/posts/edit/${id}`);
  };

  return (
    <>
      <div
        className={`post-container w-auto min-h-150 border-2 border-gray-500 rounded-2xl ml-2 mr-2 mt-10 `}
      >
        {postData ? (
          <>
            <div className="m-4">
              <h1 className="text-3xl font-bold mb-2">{postData.title}</h1>
              <h2 className="text-xl text-gray-600 mb-2">
                {postData.subTitle}
              </h2>
              <p className="text-sm text-gray-400 mb-2">
                작성자: {postData.writer} | 작성일자:
                {postData.workdate.slice(0, 10)}
              </p>
            </div>
            <div className="w-auto border-b-1 border-gray-300" />
            <div className="m-4">
              <div className="text-[20px] leading-loose">
                <Viewer
                  initialValue={postData.content}
                  plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
                />
              </div>
            </div>
          </>
        ) : (
          <p>게시글을 불러오는 중입니다...</p>
        )}
      </div>

      {isAdmin === true ? (
        <div className="flex gap-3 justify-end mt-5 mb-30 mr-3">
          <button
            type="button"
            className="w-20 h-10 bg-blue-300 rounded-[8px] cursor-pointer"
            onClick={handleEdit}
          >
            수정
          </button>
          <button
            type="button"
            className="w-20 h-10 bg-red-300 rounded-[8px] cursor-pointer"
            onClick={handleRemove}
          >
            삭제
          </button>
          <button
            type="button"
            className="w-24 h-10 bg-gray-300 rounded-[8px] cursor-pointer"
            onClick={() => navigate(-1)}
          >
            목록으로
          </button>
        </div>
      ) : (
        <div className="flex gap-3 justify-end mt-5 mb-30 mr-3">
          <button
            type="button"
            className="w-24 h-10 bg-gray-300 rounded-[8px] cursor-pointer"
            onClick={() => navigate(-1)}
          >
            목록으로
          </button>
        </div>
      )}
    </>
  );
}

export default PostView;
