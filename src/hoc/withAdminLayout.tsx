import { ComponentType } from "react";
import { Header, Footer, Sidebar } from "../components";

function withCommonLayout(Component: ComponentType) {
  const WrappedComponent = () => {
    return (
      <div className="relative overflow-hidden">
        <Header />
        <div className="flex min-h-[calc(100vh-360px)]">
          <Sidebar />
          <main className="flex-1 flex justify-center items-center">
            <Component />
          </main>
        </div>
        <Footer />
      </div>
    );
  };

  return WrappedComponent;
}

export default withCommonLayout;
