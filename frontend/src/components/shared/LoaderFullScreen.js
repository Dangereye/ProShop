import React from "react";
import { CgSpinnerTwo } from "react-icons/cg";

const LoaderFullScreen = () => {
  return (
    <div className="loader--full-screen">
      <CgSpinnerTwo className="loader--full-screen__spinner" />
    </div>
  );
};

export default LoaderFullScreen;
