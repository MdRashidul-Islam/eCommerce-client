import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import Fade from "react-reveal/Fade";
import "../Product/Product.css";

const HotDeals = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://infinite-wildwood-62452.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <div className="container-box">
      <h1 className="section-title">Hot Deals</h1>
      <Fade right>
        <div className="product-container">
          {products?.slice(6, 11)?.map((prod) => (
            <Product prod={prod} key={prod.key}></Product>
          ))}
        </div>
      </Fade>
    </div>
  );
};

export default HotDeals;
