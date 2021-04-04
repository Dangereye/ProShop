import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../actions/userActions";
import { Link } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";
import { HiUser } from "react-icons/hi";
import { IoMdArrowDropdown } from "react-icons/io";

const Navbar = () => {
  const history = useHistory();
  const [isProfile, setIsProfile] = useState(false);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleLogout = () => {
    dispatch(logout(history));
  };

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
        {userInfo ? (
          <div
            className="nav-menu__user"
            onClick={() => setIsProfile(!isProfile)}
            onMouseEnter={() => setIsProfile(!isProfile)}
            onMouseLeave={() => setIsProfile(!isProfile)}
          >
            <span>{userInfo.name}</span>
            <IoMdArrowDropdown />
            {isProfile && (
              <div className="dropdown">
                <Link to="/profile">Profile</Link>
                <div onClick={handleLogout}>Logout</div>
                {userInfo.isAdmin && (
                  <>
                    <h4>Admin</h4>
                    <Link to="/admin/userlist">Users</Link>
                    <Link to="/admin/productlist">Products</Link>
                    <Link to="/admin/orderlist">Orders</Link>
                  </>
                )}
              </div>
            )}
          </div>
        ) : (
          <Link className="nav-menu__link" to="/login">
            <HiUser />
            <span>Sign In</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
