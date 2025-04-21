import { SearchResultList } from "../components";

function SearchPage() {
  return (
    <div className="px-6 py-10 bg-gray-50 min-h-screen">
      <div className="text-3xl font-bold text-gray-700 mb-6 ml-4 uppercase">
        검색 결과
      </div>

      <SearchResultList />
    </div>
  );
}

export default SearchPage;
