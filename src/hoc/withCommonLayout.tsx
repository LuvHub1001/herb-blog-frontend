import { ComponentType } from "react";

function withCommonLayout(Component: ComponentType) {
  const WrappedComponent = () => {
    return (
      <div>
        <div>Header</div>
        <div>
          <Component />
        </div>
        <div>Footer</div>
      </div>
    );
  };

  return WrappedComponent;
}

export default withCommonLayout;
