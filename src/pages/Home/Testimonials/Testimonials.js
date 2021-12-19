import React, { useEffect, useState } from "react";
import Testimonial from "./Testimonial";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("https://infinite-wildwood-62452.herokuapp.com/testimonials")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  }, []);
  return (
    <div>
      <h1 className="section-brand">Reviews</h1>
      <div className="cart-container container-box">
        {reviews.map((review) => (
          <Testimonial key={review._id} review={review}></Testimonial>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
