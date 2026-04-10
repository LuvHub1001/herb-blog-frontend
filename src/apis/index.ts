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
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      sessionStorage.removeItem("token");
    }

    const message =
      status === 401
        ? "인증이 만료되었습니다. 다시 로그인해주세요."
        : status === 403
          ? "접근 권한이 없습니다."
          : status && status >= 500
            ? "서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
            : error.response?.data?.error || "요청 처리 중 오류가 발생했습니다.";

    return Promise.reject(new Error(message));
  },
);

export default instance;
