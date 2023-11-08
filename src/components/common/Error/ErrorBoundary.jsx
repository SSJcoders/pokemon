import React from "react";
import FallBackUI from "./FallBackUI";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <FallBackUI
          text={"Sorry!\n잠시 후 다시 시도해주세요.\n(Please try again later)"}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
