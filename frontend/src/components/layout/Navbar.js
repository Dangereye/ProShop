import React from "react";
import { Link } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";
import { HiUser } from "react-icons/hi";
const Navbar = () => {
  return (
    <nav>
      <Link className="logo" to="/">
        ProShop
      </Link>
      <div className="nav-menu">
        <Link className="nav-menu__link" to="/cart">
          <MdShoppingCart />
          <span>Cart</span>
        </Link>
        <Link className="nav-menu__link" to="/login">
          <HiUser />
          <span>Sign In</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
