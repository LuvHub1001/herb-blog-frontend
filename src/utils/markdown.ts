// 마크다운 텍스트에서 문법 기호를 제거하고 순수 텍스트만 반환
export const stripMarkdown = (markdown: string): string => {
  return markdown
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[.*?\]\(.*?\)/g, "")
    .replace(/[#>*_\-\+~`]/g, "")
    .replace(/\n+/g, " ")
    .trim();
};
