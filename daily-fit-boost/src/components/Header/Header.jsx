import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

function Header({ user, onLoginClick, onLogoutClick }) {
  return (
    <header className="header">
      <nav className="header__nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "header__link active" : "header__link"
          }
        >
          Home
        </NavLink>

        {user ? (
          <>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "header__link active" : "header__link"
              }
            >
              Profile
            </NavLink>
            <button className="header__btn" onClick={onLogoutClick}>
              Logout
            </button>
          </>
        ) : (
          <button className="header__btn" onClick={onLoginClick}>
            Login / Sign Up
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
