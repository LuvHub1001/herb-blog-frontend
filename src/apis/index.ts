import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 토큰 자동 주입
instance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// { success, data } 응답 자동 언래핑
instance.interceptors.response.use(
  (res) => {
    const body = res.data;
    if (body && typeof body === "object" && "success" in body) {
      if (body.success) {
        res.data = body.data;
      } else {
        return Promise.reject(new Error(body.error || "요청이 실패했습니다."));
      }
    }
    return res;
  },
  (error) => {
    const message =
      error.response?.data?.error || error.message || "네트워크 오류";

    if (error.response?.status === 401) {
      sessionStorage.removeItem("token");
    }

    return Promise.reject(new Error(message));
  },
);

export default instance;
