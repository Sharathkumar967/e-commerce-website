import React, { useContext, useState } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { getTotalCartItems } = useContext(ShopContext);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    navigate("/login");
  };

  const handleHomeScreen = () => {
    navigate("/");
  };

  const isLoggedIn = !!localStorage.getItem("auth-token");

  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="nav-logo" onClick={handleHomeScreen}>
          <img src={logo} alt="Logo" />
          <p>SHOPPER</p>
        </div>

        <div className="nav-menu-icon" onClick={toggleMenu}>
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 6H21"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 12H21"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 18H21"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <ul className={`nav-menu ${isMenuOpen ? "open" : ""}`}>
          <li
            onClick={() => {
              setMenu("shop");
              setIsMenuOpen(false);
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/">
              Shop
            </Link>
            {menu === "shop" ? <hr /> : null}
          </li>
          <li
            onClick={() => {
              setMenu("mens");
              setIsMenuOpen(false);
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/mens">
              Men
            </Link>
            {menu === "mens" ? <hr /> : null}
          </li>
          <li
            onClick={() => {
              setMenu("womens");
              setIsMenuOpen(false);
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/womens">
              Women
            </Link>
            {menu === "womens" ? <hr /> : null}
          </li>
          <li
            onClick={() => {
              setMenu("kids");
              setIsMenuOpen(false);
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/kids">
              Kids
            </Link>
            {menu === "kids" ? <hr /> : null}
          </li>
        </ul>

        <div className="login-cartTotal">
          {isLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <Link style={{ textDecoration: "none" }} to="/login">
              <button>Login</button>
            </Link>
          )}

          <div className="nav-cartTotal">
            <Link style={{ textDecoration: "none" }} to="/cart">
              <img src={cart_icon} alt="Cart" />
              <div className="nav-cart-count">{getTotalCartItems()}</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
