function NoPost() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-slate-300">
      <div className="w-20 h-20 mb-5 rounded-2xl bg-slate-50 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-slate-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
          />
        </svg>
      </div>
      <p className="text-[15px] font-medium text-slate-400">
        아직 작성된 글이 없습니다
      </p>
      <p className="text-sm text-slate-300 mt-1">첫 번째 글을 기다리고 있어요</p>
    </div>
  );
}

export default NoPost;
