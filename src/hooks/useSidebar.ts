import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useSidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const handleToggleSidebar = () => setIsOpen(!isOpen);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return { isOpen, handleToggleSidebar, handleNavigate, handleLogout };
};

export default useSidebar;
