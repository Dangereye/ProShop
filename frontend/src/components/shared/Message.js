import React from "react";
import { BiErrorCircle } from "react-icons/bi";

const Message = ({ text, error }) => {
  return (
    <div className={error ? "message error" : "message"}>
      {error && <BiErrorCircle className="message__icon" />}
      <span className="message__text">{text}</span>
    </div>
  );
};

Message.defaultProps = {
  error: false,
};

export default Message;
