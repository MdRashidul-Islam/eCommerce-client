import { Alert, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const MakeAdmin = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const { token } = useAuth();

  const handleOnBlur = (e) => {
    setEmail(e.target.value);
  };

  const handleAdminSubmit = (e) => {
    const user = { email };
    fetch("http://localhost:5000/users/admin", {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire("Make Admin Successfully", "", "success");
        }
      });
    e.preventDefault();
  };
  return (
    <div>
      <h1 style={{ color: "#FD6506", textAlign: "center", marginTop: "50px" }}>
        MAKE AN ADMIN
      </h1>
      <form
        style={{ width: "40%", display: "block", margin: "auto" }}
        onSubmit={handleAdminSubmit}
      >
        <input
          placeholder="Enter an valid email"
          type="email"
          onBlur={handleOnBlur}
        />

        <br />
        <button sx={{ width: "40px" }} className="auth" type="submit">
          Make Admin
        </button>
      </form>
      {success && <Alert severity="success">ADMIN CREATED SUCCESSFULLY</Alert>}
    </div>
  );
};

export default MakeAdmin;
