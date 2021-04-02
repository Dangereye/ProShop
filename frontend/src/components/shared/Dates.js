import React from "react";

const Dates = ({ date }) => {
  const event = new Date(date);
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return (
    <span className="dates">{event.toLocaleDateString("en", options)}</span>
  );
};

export default Dates;
