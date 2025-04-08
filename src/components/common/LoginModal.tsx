function LoginModal() {
  return (
    <form>
      <div className="flex flex-col pl-10 justify-center h-80 w-100 rounded-2xl bg-white">
        <div className="id-area ">
          <label>아이디: </label>
          <input
            type="text"
            className="h-10 ml-1 border-2 rounded-2xl placeholder:pl-2"
            placeholder="아이디를 입력해주세요."
          />
        </div>

        <div className="pw-area mt-5">
          <label>패스워드: </label>
          <input
            type="password"
            className="h-10 ml-1 border-2 rounded-2xl placeholder:pl-2"
            placeholder="비밀번호를 입력해주세요."
          />
        </div>

        <div className="btn-area mt-10 items-center">
          <button type="submit" className="w-80 h-10 bg-amber-500 rounded-3xl">
            로그인
          </button>
        </div>
      </div>
    </form>
  );
}

export default LoginModal;
