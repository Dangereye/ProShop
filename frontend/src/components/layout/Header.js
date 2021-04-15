import React, { useState } from "react";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";

const Header = () => {
  const [isSearch, setIsSearch] = useState();
  return (
    <header>
      <Navbar setIsSearch={setIsSearch} />
      <SearchBar isSearch={isSearch} setIsSearch={setIsSearch} />
    </header>
  );
};

export default Header;
