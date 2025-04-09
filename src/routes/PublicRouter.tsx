import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { withCommonLayout } from "../hoc";
import { Loading } from "../components";

const MainPage = lazy(() => import("../pages/MainPage"));
const WrappedMainPage = withCommonLayout(MainPage);

const PostPage = lazy(() => import("../pages/PostPage"));
const WrappedPostPage = withCommonLayout(PostPage);

const EditPage = lazy(() => import("../pages/EditPage"));
const WrappedEditPage = withCommonLayout(EditPage);

function PublicRouter() {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WrappedMainPage />} />
          <Route path="/posts/:category" element={<WrappedPostPage />} />
          <Route path="/post/edit" element={<WrappedEditPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default PublicRouter;
