import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const SearchBar = ({ isSearch, setIsSearch }) => {
  const [keyword, setKeyword] = useState("");
  const history = useHistory();

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      setIsSearch(false);
      history.push(`/search/${keyword}`);
      setKeyword("");
    } else {
      setIsSearch(false);
      history.push("/");
    }
  };

  return (
    <form
      className={isSearch ? "search-group open" : "search-group"}
      onSubmit={handleSearch}
    >
      <div className="container">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Name, Brand or Category.."
        />
        <FaTimes className="close-icon" onClick={() => setIsSearch(false)} />
      </div>
    </form>
  );
};

export default SearchBar;
