import { useParams } from "react-router-dom";
import { get } from "../../apis";
import { useFetch } from "../../hooks";
import { PostType } from "../../types";

interface PostFetchResult {
  data: PostType;
}

function PostList() {
  const { category } = useParams();
  const recentItems = useFetch<string, PostFetchResult>(
    get,
    "http://localhost:5000/api/boards/",
  );

  return (
    <div className="flex justify-center border-1 border-red-400">
      <div className="grid grid-cols-3 mt-3 w-[80%] h-250 border-1 text-center items-center">
        <div>1</div>
        <div>2</div>
        <div>3</div>

        <div>1</div>
        <div>2</div>
        <div>3</div>
      </div>
    </div>
  );
}

export default PostList;
