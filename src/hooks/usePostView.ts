import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getBoardDetail, deleteBoard } from "@/apis/BoardFetcher";
import useAuth from "@/hooks/useAuth";

const usePostView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const { data: postData } = useQuery({
    queryKey: ["boards", "detail", id],
    queryFn: () => getBoardDetail(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (!id) return;
    const viewedKey = `viewed-post-${id}`;
    const viewed = sessionStorage.getItem(viewedKey);

    if (!viewed) {
      getBoardDetail(id).catch(() => {});
      sessionStorage.setItem(viewedKey, "true");
    }
  }, [id]);

  const handleEdit = () => {
    navigate(`/posts/edit/${id}`);
  };

  const handleRemoveClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleRemoveConfirm = async () => {
    if (!id) return;
    setShowDeleteConfirm(false);

    try {
      await deleteBoard(id);
      toast.success("게시글이 삭제되었습니다.");
      navigate("/");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "게시글 삭제에 실패했습니다.",
      );
    }
  };

  const handleRemoveCancel = () => {
    setShowDeleteConfirm(false);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return {
    postData,
    isAdmin,
    showDeleteConfirm,
    handleEdit,
    handleRemoveClick,
    handleRemoveConfirm,
    handleRemoveCancel,
    handleGoBack,
  };
};

export default usePostView;
