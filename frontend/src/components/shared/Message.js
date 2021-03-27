import React from "react";
import { BiErrorCircle } from "react-icons/bi";

const Message = ({ text, error, success }) => {
  return (
    <div
      className={
        error ? "message error" : success ? "message success" : "message"
      }
    >
      {error && <BiErrorCircle className="message__icon" />}
      <span className="message__text">{text}</span>
    </div>
  );
};

Message.defaultProps = {
  error: false,
  success: false,
};

export default Message;
