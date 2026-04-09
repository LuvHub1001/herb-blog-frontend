function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <p className="text-6xl font-bold text-slate-200 mb-4">Oops</p>
      <p className="text-lg text-slate-500 mb-2">에러가 발생했습니다.</p>
      <p className="text-sm text-slate-400">잠시 후 다시 시도해주세요.</p>
    </div>
  );
}

export default ErrorPage;
