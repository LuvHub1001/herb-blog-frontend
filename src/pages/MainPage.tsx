import { useNavigate } from "react-router-dom";
import { PostContainer } from "../components";

function MainPage() {
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate("/posts/edit")}>글쓰기</button>
      <PostContainer />
    </>
  );
}

export default MainPage;
