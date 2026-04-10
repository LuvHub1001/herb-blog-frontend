import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,                  // 항상 stale → 마운트/포커스 시 refetch
      refetchOnMount: "always",      // 컴포넌트 마운트마다 refetch
      refetchOnWindowFocus: true,    // 탭 복귀 시 refetch
      refetchOnReconnect: true,      // 네트워크 복구 시 refetch
      retry: 1,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);
