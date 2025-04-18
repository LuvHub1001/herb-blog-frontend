import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Viewer } from "@toast-ui/react-editor";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import "../../css/PostView.css";
import { get } from "../../apis";
import { useFetch } from "../../hooks";
import { PostType } from "../../types";

function PostView() {
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

  return (
    <div className="post-container w-auto min-h-150 border-2 border-gray-500 rounded-2xl ml-2 mr-2 mt-10 mb-30">
      {postData ? (
        <>
          <div className="m-4">
            <h1 className="text-3xl font-bold mb-2">{postData.title}</h1>
            <h2 className="text-xl text-gray-600 mb-2">{postData.subTitle}</h2>
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
  );
}

export default PostView;
