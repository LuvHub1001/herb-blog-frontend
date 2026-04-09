import instance from "@/apis";
import type {
  BoardListItem,
  BoardDetail,
  PaginatedBoards,
  SearchResult,
  BoardStats,
  CreateBoardRequest,
  UpdateBoardRequest,
} from "@/types";

// 메인 페이지 게시글 조회
export const getMainRecent = async (): Promise<BoardListItem[]> => {
  const { data } = await instance.get("/boards/main-recent");
  return data;
};

export const getMainTil = async (): Promise<BoardListItem[]> => {
  const { data } = await instance.get("/boards/main-til");
  return data;
};

export const getMainDiary = async (): Promise<BoardListItem[]> => {
  const { data } = await instance.get("/boards/main-diary");
  return data;
};

// 게시글 목록 (페이지네이션)
export const getBoards = async (
  page: number,
  limit: number,
  category?: string,
): Promise<PaginatedBoards> => {
  const url = category
    ? `/boards/${category}/${page}/${limit}`
    : `/boards/${page}/${limit}`;
  const { data } = await instance.get(url);
  return data;
};

// 게시글 상세
export const getBoardDetail = async (id: string): Promise<BoardDetail> => {
  const { data } = await instance.get(`/boards/detail/${id}`);
  return data;
};

// 게시글 검색 (서버 페이지네이션)
export const searchBoards = async (
  keyword: string,
  page: number = 1,
  limit: number = 20,
): Promise<SearchResult> => {
  const { data } = await instance.get(
    `/boards/search?keyword=${encodeURIComponent(keyword)}&page=${page}&limit=${limit}`,
  );
  return data;
};

// 게시글 생성
export const createBoard = async (
  postData: CreateBoardRequest,
): Promise<BoardDetail> => {
  const { data } = await instance.post("/boards", postData);
  return data;
};

// 게시글 수정
export const updateBoard = async (
  id: string,
  postData: UpdateBoardRequest,
): Promise<BoardDetail> => {
  const { data } = await instance.patch(`/boards/${id}`, postData);
  return data;
};

// 게시글 삭제
export const deleteBoard = async (id: string): Promise<void> => {
  await instance.delete(`/boards/${id}`);
};

// 게시글 통계
export const getBoardStats = async (): Promise<BoardStats> => {
  const { data } = await instance.get("/boards/stats");
  return data;
};
