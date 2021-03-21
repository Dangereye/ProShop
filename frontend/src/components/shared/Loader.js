import React from "react";
import { ImSpinner2 } from "react-icons/im";

const Loader = ({ text }) => {
  return (
    <div className="loader">
      <ImSpinner2 className="loader__spinner" />
      <span className="loader__text">{text}</span>
    </div>
  );
};

export default Loader;
