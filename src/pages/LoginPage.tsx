import { Navigate } from "react-router-dom";
import { LoginModal } from "@/components";

function LoginPage() {
  const token = sessionStorage.getItem("token");
  if (token) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <LoginModal />
    </div>
  );
}

export default LoginPage;
