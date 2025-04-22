function NoPost() {
  return (
    <div className="flex items-center justify-center h-60 sm:h-72 md:h-80">
      <div className="text-center px-4">
        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-500">
          작성된 게시글이 없습니다 ❌
        </div>
      </div>
    </div>
  );
}

export default NoPost;
