import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Pagination = ({ pages, page }) => {
  const location = useLocation();
  const path = location.pathname;
  const baseURL =
    path.split("/page/")[0] === "/" ? "" : path.split("/page/")[0];
  if (pages <= 1) return null;
  return (
    <div className="pagination">
      {[...Array(pages).keys()].map((x) => (
        <Link
          className={x + 1 === page ? "active" : ""}
          key={x + 1}
          to={`${baseURL}/page/${x + 1}`}
        >
          {x + 1}
        </Link>
      ))}
    </div>
  );
};

export default Pagination;
