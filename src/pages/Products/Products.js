import React, { useEffect, useState } from "react";
import Product from "../Home/Product/Product";
import HeadShake from "react-reveal/HeadShake";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://infinite-wildwood-62452.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  });

  return (
    <>
      <div className="container-box">
        <Link style={{ marginLeft: "90%", display: "inline" }} to="/">
          <FontAwesomeIcon icon={faBackward} /> Home
        </Link>
        <h1 className="section-title">All Products</h1>
        <HeadShake>
          <div className="product-container">
            {products.map((prod) => (
              <Product prod={prod}></Product>
            ))}
          </div>
        </HeadShake>
      </div>
    </>
  );
};

export default Products;
