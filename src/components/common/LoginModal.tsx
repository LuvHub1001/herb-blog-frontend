function LoginModal() {
  return (
    <form className="w-[400px] p-8 rounded-2xl bg-white shadow-2xl">
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
