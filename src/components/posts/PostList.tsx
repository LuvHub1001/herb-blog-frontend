import { useParams } from "react-router-dom";
import { get } from "../../apis";
import { useFetch } from "../../hooks";
import { PostType, Nullable } from "../../types";

interface PostFetchResult {
  data: Nullable<PostType[]>;
  totalPageCount: number;
}

function PostList() {
  const { category } = useParams();
  const recentItems = useFetch<string, PostFetchResult>(
    get,
    "http://localhost:5000/api/boards/",
  );

  const tilItems = useFetch<string, PostFetchResult>(
    get,
    "http://localhost:5000/api/boards/til",
  );

  const diaryItems = useFetch<string, PostFetchResult>(
    get,
    "http://localhost:5000/api/boards/diary",
  );

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-3 gap-10 mt-3 mb-3 w-[70%] h-180  text-center">
        <div className="image-container mt-3 h-87 border-1 border-blue-500 rounded-2xl">
          <div className="flex h-55 justify-center items-center border-b-1">
            <img alt="이미지" src="zz" />
          </div>

          <div className="info-container text-left pl-3 pt-3 pr-3">
            <div className="flex justify-between">
              <div>임시 제목</div>
              <div>임시 작성자</div>
            </div>
            <div>임시 서브 제목</div>
            <div>임시 서브 내용</div>
            <div>임시 작성 일자</div>
          </div>
        </div>

        <div className="image-container mt-3 h-87 border-1 border-blue-500 rounded-2xl">
          <div className="flex h-55 justify-center items-center border-b-1">
            <img alt="이미지" src="zz" />
          </div>

          <div className="info-container text-left pl-3 pt-3 pr-3">
            <div className="flex justify-between">
              <div>임시 제목</div>
              <div>임시 작성자</div>
            </div>
            <div>임시 서브 제목</div>
            <div>임시 서브 내용</div>
            <div>임시 작성 일자</div>
          </div>
        </div>

        <div className="image-container mt-3 h-87 border-1 border-blue-500 rounded-2xl">
          <div className="flex h-55 justify-center items-center border-b-1">
            <img alt="이미지" src="zz" />
          </div>

          <div className="info-container text-left pl-3 pt-3 pr-3">
            <div className="flex justify-between">
              <div>임시 제목</div>
              <div>임시 작성자</div>
            </div>
            <div>임시 서브 제목</div>
            <div>임시 서브 내용</div>
            <div>임시 작성 일자</div>
          </div>
        </div>

        <div className="image-container mt-3 h-87 border-1 border-blue-500 rounded-2xl">
          <div className="flex h-55 justify-center items-center border-b-1">
            <img alt="이미지" src="zz" />
          </div>

          <div className="info-container text-left pl-3 pt-3 pr-3">
            <div className="flex justify-between">
              <div>임시 제목</div>
              <div>임시 작성자</div>
            </div>
            <div>임시 서브 제목</div>
            <div>임시 서브 내용</div>
            <div>임시 작성 일자</div>
          </div>
        </div>

        <div className="image-container mt-3 h-87 border-1 border-blue-500 rounded-2xl">
          <div className="flex h-55 justify-center items-center border-b-1">
            <img alt="이미지" src="zz" />
          </div>

          <div className="info-container text-left pl-3 pt-3 pr-3">
            <div className="flex justify-between">
              <div>임시 제목</div>
              <div>임시 작성자</div>
            </div>
            <div>임시 서브 제목</div>
            <div>임시 서브 내용</div>
            <div>임시 작성 일자</div>
          </div>
        </div>

        <div className="image-container mt-3 h-87 border-1 border-blue-500 rounded-2xl">
          <div className="flex h-55 justify-center items-center border-b-1">
            <img alt="이미지" src="zz" />
          </div>

          <div className="info-container text-left pl-3 pt-3 pr-3">
            <div className="flex justify-between">
              <div>임시 제목</div>
              <div>임시 작성자</div>
            </div>
            <div>임시 서브 제목</div>
            <div>임시 서브 내용</div>
            <div>임시 작성 일자</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostList;
