import React from "react";
import { Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "./AddProduct.css";

const AddProduct = () => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    fetch("http://localhost:5000/Products", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          reset();
          Swal.fire("Product Add Successfully", "", "success");
        }
      });
  };

  return (
    <div className="addProduct">
      <div>
        <Typography
          value="h1"
          sx={{
            fontWeight: "bold",
            fontSize: "25px",
            color: "#FD6506",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          {" "}
          ADD PPRODUCT
        </Typography>
        <form className="field" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("img", { required: true })}
            placeholder="Img Link"
          />{" "}
          <br />
          <input
            {...register("name", { required: true })}
            placeholder="Product-Name"
          />
          <br />
          <input {...register("category")} placeholder="Category" />
          <br />
          <input type="number" {...register("stock")} placeholder="Stock" />
          <br />
          <input type="number" {...register("star")} placeholder="Rating" />
          <br />
          <input {...register("seller")} placeholder="Seller" />
          <br />
          <input type="number" {...register("price")} placeholder="Price" />
          <br />
          <input className="auth" type="submit" value="ADD PRODUCT" />
          <br />
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
