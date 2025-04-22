import { Suspense, useEffect } from "react";
import { ErrorBoundary, Loading } from "./components";
import PublicRouter from "./routes/PublicRouter";
import "./App.css";

function App() {
  useEffect(() => {
    const incrementVisitorCount = async () => {
      try {
        await fetch("http://localhost:5000/api/visitor", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.error("방문자 카운트 증가 실패:", error);
      }
    };

    incrementVisitorCount();
  }, []);

  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <PublicRouter />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
