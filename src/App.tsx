import { Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { ErrorBoundary, Loading } from "@/components";
import PublicRouter from "@/routers/PublicRouter";
import { recordVisitor } from "@/apis/VisitorFetcher";
import "./App.css";

function App() {
  useEffect(() => {
    recordVisitor().catch(() => {});
  }, []);

  return (
    <ErrorBoundary>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            fontSize: "14px",
            borderRadius: "12px",
            padding: "12px 20px",
          },
        }}
      />
      <Suspense fallback={<Loading />}>
        <PublicRouter />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
