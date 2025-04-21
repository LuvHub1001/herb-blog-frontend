import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminChart } from "../components";

function AdminPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return <AdminChart />;
}

export default AdminPage;
