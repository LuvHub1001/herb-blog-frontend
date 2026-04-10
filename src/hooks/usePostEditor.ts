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
  // 에디터의 초기 마크다운만 보관한다. 입력 중인 본문은 React state로 끌어올리지 않는다
  // (매 키 입력마다 부모 리렌더 + MDXEditor 리렌더가 발생해 입력이 느려짐).
  // 저장 시점에 PostEditor가 ref로 현재 마크다운을 읽어 handleSave에 넘긴다.
  const [initialContent, setInitialContent] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [existingThumbnail, setExistingThumbnail] = useState("");
  // 새 글이면 즉시 ready, 수정 모드면 API 응답 후 ready.
  // MDXEditor의 markdown prop은 초기값으로만 쓰이므로 ready 시점에 한 번만 마운트해야 한다.
  const [isReady, setIsReady] = useState(!id);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const handleThumbnailSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setThumbnailFile(file);
      }
    },
    [],
  );

  const uploadImageFile = useCallback(async (file: File): Promise<string> => {
    try {
      const resizedFile = await imageCompression(
        file,
        IMAGE_COMPRESSION_OPTIONS,
      );
      return await uploadImage(resizedFile);
    } catch {
      toast.error("이미지 업로드에 실패했습니다.");
      throw new Error("이미지 업로드에 실패했습니다.");
    }
  }, []);

  const handleSave = useCallback(async (content: string) => {
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
  }, [formData, existingThumbnail, thumbnailFile, id, navigate, queryClient]);

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
        setInitialContent(response.content);
        setIsReady(true);
      } catch {
        toast.error("게시글 로딩에 실패했습니다.");
      }
    };

    fetchPost();
  }, [id]);

  return {
    formData,
    initialContent,
    isReady,
    thumbnailFile,
    existingThumbnail,
    handleChange,
    handleThumbnailSelect,
    uploadImageFile,
    handleSave,
    handleSubmit,
  };
};

export default usePostEditor;
