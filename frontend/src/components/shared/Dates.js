import React from "react";

const Dates = ({ date, long }) => {
  const event = new Date(date);
  let options;
  if (!long) {
    options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
  } else {
    options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
  }
  return (
    <span className="dates">{event.toLocaleDateString("en", options)}</span>
  );
};

export default Dates;
