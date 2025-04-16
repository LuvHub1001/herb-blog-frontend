import { useState } from "react";
import { post } from "../../apis";

interface LoginResponse {
  token: string;
}

function LoginModal() {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await post<{ id: string; password: string }, LoginResponse>(
        "http://localhost:5000/api/auth/login",
        {
          id,
          password,
        },
      );
      localStorage.setItem("token", res.token);
      alert("환영합니다!");
      window.location.reload();
    } catch (e) {
      console.log(e);
      alert("로그인 실패");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[400px] p-8 rounded-2xl bg-white shadow-2xl"
    >
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
        관리자 로그인
      </h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          아이디
        </label>
        <input
          type="text"
          className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="아이디를 입력해주세요."
        />
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          비밀번호
        </label>
        <input
          type="password"
          className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해주세요."
        />
      </div>

      <button
        type="submit"
        className="w-full h-10 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full transition"
      >
        로그인
      </button>
    </form>
  );
}

export default LoginModal;
