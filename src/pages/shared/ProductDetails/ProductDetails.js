import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./ProductDetails.css";
import { Typography as h4 } from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  const { _id } = useParams();
  const [product, setProduct] = useState({});

  const onSubmit = (data) => {
    data.productName = product.name;
    data.price = product.price;
    data.img = product.img;
    data.status = "Panding";

    fetch("http://localhost:5000/orderedProducts", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.insertedId) {
          reset();
          Swal.fire("Ordered Successfully!", "", "success");
        }
      });
  };

  useEffect(() => {
    fetch(`http://localhost:5000/products/${_id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [_id]);

  return (
    <div className="product-details">
      <div className="product-part">
        <img src={product.img} alt="" />
        <h3>Name: {product.name}</h3>
        <h4>Categori: {product.category}</h4>
        <h4>Price: {product.price}</h4>
        <h4>Total Views: {product.starCount}</h4>
        <h4>Rating: {product.star} </h4>
      </div>
      <div className="product-part">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("name")}
            defaultValue={user?.displayName}
            placeholder="Your Name"
          />
          <input
            {...register("email")}
            defaultValue={user?.email}
            placeholder="Your Email"
          />
          <input
            {...register("productName")}
            defaultValue={product?.name}
            placeholder="Product-Name"
          />
          <input
            {...register("price")}
            placeholder="ProductPrice"
            defaultValue={product?.price}
          />
          <input
            type="number"
            {...register("quantity")}
            placeholder="Product-Quantity"
          />
          <input
            type="number"
            {...register("phone")}
            placeholder="Your Phone Number"
          />
          <input className="auth" type="submit" value="PlaceOrder" />
        </form>
      </div>
    </div>
  );
};

export default ProductDetails;
