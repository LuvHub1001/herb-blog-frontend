import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 토큰 자동 주입 + GET 요청 캐시 바이패스
instance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // GET 응답에 대한 브라우저/중간 캐시 방지 (삭제·수정 직후 stale 응답 방지)
  if ((config.method ?? "get").toLowerCase() === "get") {
    config.headers["Cache-Control"] = "no-cache";
    config.headers["Pragma"] = "no-cache";
    config.params = { ...(config.params ?? {}), _t: Date.now() };
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
    const serverError: string | undefined = error.response?.data?.error;

    // 인증/세션 만료 — 토큰 정리 후 로그인 페이지로 이동
    const isTokenExpired =
      status === 403 && serverError === "토큰이 만료되었습니다.";
    const isUnauthorized = status === 401 || isTokenExpired;

    if (isUnauthorized) {
      sessionStorage.removeItem("token");
      // 이미 /login 또는 공개 페이지가 아닌 경우에만 리다이렉트
      const path = window.location.pathname;
      if (path.startsWith("/admin") || path.startsWith("/posts/edit")) {
        window.location.href = "/login";
      }
    }

    let message: string;
    if (isUnauthorized) {
      message = "세션이 만료되었습니다. 다시 로그인해주세요.";
    } else if (status === 403) {
      message = "접근 권한이 없습니다.";
    } else if (status === 429) {
      message = "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.";
    } else if (status && status >= 500) {
      message = "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
    } else {
      message = serverError || "요청 처리 중 오류가 발생했습니다.";
    }

    return Promise.reject(new Error(message));
  },
);

export default instance;
