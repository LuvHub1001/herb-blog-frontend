import { ComponentType } from "react";
import { Header, Footer } from "../components";

function withCommonLayout(Component: ComponentType) {
  const WrappedComponent = () => {
    return (
      <div>
        <Header />
        <div
          style={{
            minHeight: "calc(100vh - 360px)",
          }}
        >
          <Component />
        </div>
        <Footer />
      </div>
    );
  };

  return WrappedComponent;
}

export default withCommonLayout;
