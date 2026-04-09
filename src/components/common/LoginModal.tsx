import { useLoginForm } from "@/hooks";

function LoginModal() {
  const { id, password, handleIdChange, handlePasswordChange, handleSubmit } =
    useLoginForm();

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[360px] p-8 rounded-2xl bg-white shadow-2xl shadow-black/10"
    >
      <div className="text-center mb-8">
        <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-slate-800">관리자 로그인</h2>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-300 transition-all"
          value={id}
          onChange={handleIdChange}
          placeholder="아이디를 입력해주세요."
        />
        <input
          type="password"
          className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-300 transition-all"
          value={password}
          onChange={handlePasswordChange}
          placeholder="비밀번호를 입력해주세요."
        />
      </div>

      <button
        type="submit"
        className="w-full h-12 mt-6 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
      >
        로그인
      </button>
    </form>
  );
}

export default LoginModal;
