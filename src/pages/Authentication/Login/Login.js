import React, { useState } from "react";
import "./Login.css";
import google from "../../../img/Google.png";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
  const [loginData, setLoginData] = useState({});
  const { user, isLoading, loginWithEmail, error, loginWithGoogle } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  console.log(loginData);
  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };

  const handleLoginSubmit = (e) => {
    loginWithEmail(loginData.email, loginData.password, location, navigate);
    e.preventDefault();
  };

  const handleGoogle = () => {
    loginWithGoogle(location, navigate);
  };

  return (
    <div>
      <Link className="back" to="/">
        Home
      </Link>
      <div className="form-container">
        <div className="form">
          <h1 className="section-title auth-brand ">Login</h1>
          <form onSubmit={handleLoginSubmit}>
            <input
              onBlur={handleOnBlur}
              type="email"
              name="email"
              placeholder="Email"
            />{" "}
            <br />
            <input
              onBlur={handleOnBlur}
              type="password"
              name="password"
              placeholder="Password"
            />{" "}
            <br />
            <button type="submit" className="auth">
              LogIn
            </button>
          </form>
          <Link to="/register">New in this site? Register!</Link>
          <h1 style={{ textAlign: "center", marginBottom: "10px" }}>OR</h1>
          <button onClick={handleGoogle} className="google-btn">
            <span>
              <img height="15px" src={google} alt="" />
            </span>{" "}
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
