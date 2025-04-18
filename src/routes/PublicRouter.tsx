import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { withCommonLayout, withAdminLayout } from "../hoc";
import { Loading } from "../components";

const MainPage = lazy(() => import("../pages/MainPage"));
const WrappedMainPage = withCommonLayout(MainPage);

const PostPage = lazy(() => import("../pages/PostPage"));
const WrappedPostPage = withCommonLayout(PostPage);

const EditPage = lazy(() => import("../pages/EditPage"));
const WrappedEditPage = withCommonLayout(EditPage);

const PostViewPage = lazy(() => import("../pages/PostViewPage"));
const WrappedPostViewPage = withCommonLayout(PostViewPage);

const AdminPage = lazy(() => import("../pages/AdminPage"));
const WrappedAdminPage = withAdminLayout(AdminPage);

const AdminPostPage = lazy(() => import("../pages/AdminPostPage"));
const WrappedAdminPostPage = withAdminLayout(AdminPostPage);

function PublicRouter() {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WrappedMainPage />} />
          <Route path="/posts/edit/:id" element={<WrappedEditPage />} />
          <Route path="/posts/:category" element={<WrappedPostPage />} />
          <Route path="/posts/detail/:id" element={<WrappedPostViewPage />} />
          <Route path="/admin" element={<WrappedAdminPage />} />
          <Route path="/admin/postlist" element={<WrappedAdminPostPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default PublicRouter;
