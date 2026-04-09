// API 공통 응답
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// 게시글 목록용 (content 없음)
export interface BoardListItem {
  id: number;
  writer: string;
  title: string;
  subTitle: string;
  subContent: string;
  thumbnail: string;
  category: string;
  viewCount: number;
  workdate: string;
}

// 게시글 상세 (content 포함)
export interface BoardDetail extends BoardListItem {
  content: string;
}

// 페이지네이션 응답
export interface PaginatedBoards {
  res: BoardListItem[];
  totalCount: number;
  startIndex: number;
  endIndex: number;
}

// 검색 응답
export interface SearchResult {
  res: BoardListItem[];
  totalCount: number;
}

// 게시글 생성 요청
export interface CreateBoardRequest {
  title: string;
  subTitle: string;
  content: string;
  subContent?: string;
  thumbnail?: string;
  category: string;
}

// 게시글 수정 요청
export type UpdateBoardRequest = Partial<CreateBoardRequest>;

// 게시판 통계
export interface BoardStats {
  today: number;
  yesterday: number;
  total: number;
  monthly: { month: string; totalViews: number }[];
}

// 방문자 통계
export interface VisitorStats {
  today: number;
  yesterday: number;
  total: number;
  monthlyStats: { month: string; count: number }[];
}

// 인증 사용자 정보
export interface AuthUser {
  id: string;
  role: string;
  email: string;
}
