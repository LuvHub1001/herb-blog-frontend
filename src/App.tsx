import { Suspense, useEffect } from "react";
import { ErrorBoundary, Loading } from "./components";
import PublicRouter from "./routes/PublicRouter";
import "./App.css";

function App() {
  useEffect(() => {
    const incrementVisitorCount = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}/visitor`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("방문자 카운트 증가 실패");
        }
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
