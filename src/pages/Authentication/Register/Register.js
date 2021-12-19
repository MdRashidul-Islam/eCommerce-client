import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const Register = () => {
  const [loginData, setLoginData] = useState({});
  const navigate = useNavigate();
  const { user, registerUser, isLoading, error } = useAuth();

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };

  const handleLoginSubmit = (e) => {
    if (loginData.password !== loginData.password2) {
      alert("not match");
      return;
    }
    registerUser(loginData.email, loginData.password, loginData.name, navigate);
    e.preventDefault();
  };

  return (
    <div>
      <Link className="back" to="/">
        Home
      </Link>
      <div>
        <div className="form-container">
          <div className="form">
            <h1 className="section-title auth-brand">Register</h1>
            <form onSubmit={handleLoginSubmit}>
              <input
                type="text"
                onBlur={handleOnBlur}
                name="name"
                placeholder="Name"
              />{" "}
              <br />
              <input
                type="email"
                onBlur={handleOnBlur}
                name="email"
                placeholder="Email"
              />{" "}
              <br />
              <input
                type="password"
                onBlur={handleOnBlur}
                name="password"
                placeholder="Password"
              />{" "}
              <br />
              <input
                type="password"
                onBlur={handleOnBlur}
                name="password2"
                placeholder="Retype-Password"
              />{" "}
              <br />
              <button type="submit" className="auth">
                Register
              </button>
            </form>
            <Link to="/login">Already have an account?LoginIn!</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
