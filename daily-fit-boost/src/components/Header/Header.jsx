import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <nav className="header__nav">
        <Link className="header__link" to="/">
          Home
        </Link>
        <Link className="header__link" to="/profile">
          Profile
        </Link>
      </nav>
    </header>
  );
}

export default Header;
