import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../img/download-removebg-preview.png";

const Navigation = () => {
  const { user, logOut } = useAuth();

  return (
    <div className="navigation">
      <div className="nav-brand">
        <img src={logo} height="60px" width="60px" alt="" />
      </div>
      <input type="checkbox" id="toggle-menu" />
      <div className="nav-item">
        <Link to="home">Home</Link>
        <Link to="products">Products</Link>
        {user?.email && <Link to="dashboard">Dashboard</Link>}
        {user?.email && <Link to="#"> {user.displayName}</Link>}

        {user?.email ? (
          <Link onClick={logOut} className="auth-btn" to="">
            LogOut
          </Link>
        ) : (
          <Link className="auth-btn" to="login">
            Login
          </Link>
        )}
      </div>
      <label htmlFor="toggle-menu" className="toggle">
        <FontAwesomeIcon icon={faBars} />
      </label>
    </div>
  );
};

export default Navigation;
