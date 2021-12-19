import React from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";

const Product = ({ prod }) => {
  const { img, name, _id, star, category, stock, price } = prod;

  return (
    <div className="product">
      <img src={img} alt="" />
      <h3>Name: {name.slice(0, 10)}</h3>
      <h4>Category: {category}</h4>
      <h4>Stock: {stock}</h4>
      <h3>Price: {price}</h3>
      <h4>
        <Rating name="size-small" defaultValue={star} readOnly />
      </h4>
      <Link to={`productDetails/${_id}`}>
        <button className="cart-btn">Add to cart</button>
      </Link>
    </div>
  );
};

export default Product;
