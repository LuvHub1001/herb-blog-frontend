import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import imageCompression from "browser-image-compression";
import { getBoardDetail, createBoard, updateBoard } from "@/apis/BoardFetcher";
import { uploadImage } from "@/apis/UploadFetcher";
import type { CreateBoardRequest, UpdateBoardRequest } from "@/types";

interface PostFormData {
  category: string;
  subTitle: string;
  title: string;
}

const initialFormData: PostFormData = {
  category: "",
  subTitle: "",
  title: "",
};

const IMAGE_COMPRESSION_OPTIONS = {
  maxSizeMB: 1,
  maxWidthOrHeight: 600,
  useWebWorker: true,
};

function validateForm(formData: PostFormData, content: string): string | null {
  if (!formData.category) return "카테고리를 선택해 주세요.";
  if (!formData.subTitle) return "소제목을 입력해 주세요.";
  if (!formData.title) return "제목을 입력해 주세요.";
  if (!content.trim()) return "본문 내용을 작성해 주세요.";
  return null;
}

const usePostEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState(initialFormData);
  const [content, setContent] = useState("내용을 입력하세요");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [existingThumbnail, setExistingThumbnail] = useState("");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const handleContentChange = useCallback((value?: string) => {
    setContent(value || "");
  }, []);

  const handleThumbnailSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setThumbnailFile(file);
      }
    },
    [],
  );

  const handleImageUpload = useCallback(
    async (dataTransfer: DataTransfer): Promise<string> => {
      const file = dataTransfer.files[0];
      if (!file) return "";

      try {
        const resizedFile = await imageCompression(
          file,
          IMAGE_COMPRESSION_OPTIONS,
        );
        const url = await uploadImage(resizedFile);
        return `![image](${url})`;
      } catch {
        toast.error("이미지 업로드에 실패했습니다.");
        return "";
      }
    },
    [],
  );

  const handleSave = useCallback(async () => {
    const validationError = validateForm(formData, content);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    let thumbnailUrl = existingThumbnail;
    if (thumbnailFile) {
      try {
        thumbnailUrl = await uploadImage(thumbnailFile);
      } catch {
        toast.error("썸네일 업로드에 실패했습니다.");
        return;
      }
    }

    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("로그인이 필요합니다.");
      return;
    }

    try {
      if (id) {
        const patchData: UpdateBoardRequest = {
          ...formData,
          content,
          thumbnail: thumbnailUrl,
        };
        await updateBoard(id, patchData);
        toast.success("게시글이 수정되었습니다!");
      } else {
        const postData: CreateBoardRequest = {
          ...formData,
          content,
          thumbnail: thumbnailUrl,
        };
        await createBoard(postData);
        toast.success("게시글이 저장되었습니다!");
      }
      await queryClient.invalidateQueries({ queryKey: ["boards"] });
      navigate("/");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "게시글 저장에 실패했습니다.",
      );
    }
  }, [formData, content, existingThumbnail, thumbnailFile, id, navigate, queryClient]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => e.preventDefault(),
    [],
  );

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const response = await getBoardDetail(id);
        setFormData({
          category: response.category,
          subTitle: response.subTitle,
          title: response.title,
        });
        setExistingThumbnail(response.thumbnail || "");
        setContent(response.content);
      } catch {
        toast.error("게시글 로딩에 실패했습니다.");
      }
    };

    fetchPost();
  }, [id]);

  return {
    formData,
    content,
    thumbnailFile,
    existingThumbnail,
    handleChange,
    handleContentChange,
    handleThumbnailSelect,
    handleImageUpload,
    handleSave,
    handleSubmit,
  };
};

export default usePostEditor;
