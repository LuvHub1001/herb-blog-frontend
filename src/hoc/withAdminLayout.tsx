import { ComponentType } from "react";
import { Navigate } from "react-router-dom";
import { Header, Footer, Sidebar } from "@/components";

function withAdminLayout(Component: ComponentType) {
  const WrappedComponent = () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      return <Navigate to="/" replace />;
    }

    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <div className="flex flex-1 relative">
          <Sidebar />
          <main className="flex-1 overflow-auto">
            <Component />
          </main>
        </div>
        <Footer />
      </div>
    );
  };

  return WrappedComponent;
}

export default withAdminLayout;
