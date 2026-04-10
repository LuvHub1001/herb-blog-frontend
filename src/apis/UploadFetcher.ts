import instance from "@/apis";

// 이미지 업로드 (서버 경유)
export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  const { data } = await instance.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data.url;
};

// 이미지 삭제
export const deleteImage = async (url: string): Promise<void> => {
  await instance.delete("/upload", { data: { url } });
};
