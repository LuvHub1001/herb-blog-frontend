import { ComponentType } from "react";
import { Header, Footer, Sidebar } from "../components";

function withCommonLayout(Component: ComponentType) {
  const WrappedComponent = () => {
    return (
      <div>
        <Header />
        <div
          style={{
            display: "flex",
            minHeight: "calc(100vh - 360px)",
          }}
        >
          <Sidebar />
          <div className="m-auto">
            <Component />
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  return WrappedComponent;
}

export default withCommonLayout;
