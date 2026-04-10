import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { withCommonLayout, withAdminLayout, withAuthGuard } from "@/hoc";
import { Loading } from "@/components";

const MainPage = lazy(() => import("@/pages/MainPage"));
const WrappedMainPage = withCommonLayout(MainPage);

const PostPage = lazy(() => import("@/pages/PostPage"));
const WrappedPostPage = withCommonLayout(PostPage);

const EditPage = lazy(() => import("@/pages/EditPage"));
const GuardedEditPage = withAuthGuard(EditPage);
const WrappedEditPage = withCommonLayout(GuardedEditPage);

const PostViewPage = lazy(() => import("@/pages/PostViewPage"));
const WrappedPostViewPage = withCommonLayout(PostViewPage);

const AdminPage = lazy(() => import("@/pages/AdminPage"));
const WrappedAdminPage = withAdminLayout(AdminPage);

const AdminPostPage = lazy(() => import("@/pages/AdminPostPage"));
const WrappedAdminPostPage = withAdminLayout(AdminPostPage);

const SearchPage = lazy(() => import("@/pages/SearchPage"));
const WrappedSearchPage = withCommonLayout(SearchPage);

const LoginPage = lazy(() => import("@/pages/LoginPage"));

function PublicRouter() {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WrappedMainPage />} />
          <Route path="/posts/edit/" element={<WrappedEditPage />} />
          <Route path="/posts/edit/:id" element={<WrappedEditPage />} />
          <Route path="/posts/:category" element={<WrappedPostPage />} />
          <Route path="/posts/detail/:id" element={<WrappedPostViewPage />} />
          <Route path="/admin" element={<WrappedAdminPage />} />
          <Route path="/admin/postlist" element={<WrappedAdminPostPage />} />
          <Route path="/search" element={<WrappedSearchPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default PublicRouter;
