import { ComponentType } from "react";
import { Header, Footer } from "@/components";

function withCommonLayout(Component: ComponentType) {
  const WrappedComponent = () => {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <main className="flex-1">
          <Component />
        </main>
        <Footer />
      </div>
    );
  };

  return WrappedComponent;
}

export default withCommonLayout;
