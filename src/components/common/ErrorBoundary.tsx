import { Component, ErrorInfo, ReactNode } from "react";
import ErrorPage from "../../pages/ErrorPage";

interface Props {
  children: ReactNode;
}

interface States {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(err: Error) {
    return {
      hasError: true,
      error: err,
    };
  }

  componentDidCatch(err: Error, errInfo: ErrorInfo): void {
    console.log(`error:: ${err}`);
    console.log(`errInfo:: ${errInfo}`);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
