import { ComponentType } from "react";
import { Header, Footer, Sidebar } from "@/components";

function withAdminLayout(Component: ComponentType) {
  const WrappedComponent = () => {
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
