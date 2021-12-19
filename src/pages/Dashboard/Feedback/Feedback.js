import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Alert, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import "./feedback.css";
import Swal from "sweetalert2";

const Feedback = () => {
  const { user } = useAuth();
  const [success, isSuccess] = React.useState(false);
  const [name, setName] = React.useState(user.displayName);
  const [email, setEmail] = React.useState(user.email);
  const [rating, setRating] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [image, setImage] = React.useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) {
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("rating", rating);
    formData.append("message", message);
    formData.append("img", image);

    fetch("https://infinite-wildwood-62452.herokuapp.com/testimonials", {
      method: "POST",

      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.insertedId) {
          Swal.fire("Publish on review section!", "", "success");
        }
      });
  };

  return (
    <>
      <div className="details-form ">
        <div className="main-form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              readOnly
              value={user.displayName.toString() || ""}
              onBlur={(e) => setName(e.target.value)}
              id=""
            />
            <input
              type="text"
              name="email"
              readOnly
              value={user.email.toString() || ""}
              onBlur={(e) => setEmail(e.target.value)}
              id=""
            />
            <input
              type="number"
              name="rating"
              onBlur={(e) => setRating(e.target.value)}
              id=""
            />
            <textarea
              name="message"
              onBlur={(e) => setMessage(e.target.value)}
            ></textarea>
            <input
              className="file"
              accept="image/*"
              type="file"
              name="img"
              onBlur={(e) => setImage(e.target.files[0])}
              id=""
            />
            <input className="auth" type="submit" value="Send" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Feedback;
