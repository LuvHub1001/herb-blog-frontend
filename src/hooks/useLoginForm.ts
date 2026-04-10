import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { login } from "@/apis/AuthFetcher";

const useLoginForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await login(id, password);
      sessionStorage.setItem("token", res.token);
      await queryClient.invalidateQueries({ queryKey: ["auth"] });
      toast.success("환영합니다!");
      navigate("/admin", { replace: true });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "로그인에 실패했습니다.",
      );
    }
  };

  return { id, password, handleIdChange, handlePasswordChange, handleSubmit };
};

export default useLoginForm;
