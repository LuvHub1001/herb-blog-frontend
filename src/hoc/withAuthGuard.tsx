import { ComponentType } from "react";
import { Navigate } from "react-router-dom";

function withAuthGuard(Component: ComponentType) {
  const GuardedComponent = () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      return <Navigate to="/" replace />;
    }
    return <Component />;
  };

  return GuardedComponent;
}

export default withAuthGuard;
