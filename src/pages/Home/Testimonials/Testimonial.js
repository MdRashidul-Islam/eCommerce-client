import React from "react";
import "./Testimonial.css";
import Rating from "@mui/material/Rating";

const Testimonial = ({ review }) => {
  const { image, email, name, rating, text, _id } = review;

  const star = parseInt(rating);

  return (
    <div className="cart">
      <div className="cart-info">
        <img src={`data:image/png;base64,${image}`} alt="" />
        <h2>{name}</h2>
        <h5>{email}</h5>
        <p>{text}</p>
        <Rating name="size-small" defaultValue={star} readOnly />
      </div>
    </div>
  );
};

export default Testimonial;
