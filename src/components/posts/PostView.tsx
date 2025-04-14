import "../../css/PostView.css";
import { useParams } from "react-router-dom";
import { Viewer } from "@toast-ui/react-editor";
import { get } from "../../apis";
import { useFetch } from "../../hooks";
import { PostType } from "../../types";

function PostView() {
  const { id } = useParams();
  const response = useFetch<string, any>(
    get,
    `http://localhost:5000/api/boards/detail/${id}`,
  );

  const postData: PostType | null = response?.data?.[0] || null;

  return (
    <div className="post-container w-auto h-auto ml-10 mt-10 border-2 border-gray-500 rounded-2xl">
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
              <Viewer initialValue={postData.content} />
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
