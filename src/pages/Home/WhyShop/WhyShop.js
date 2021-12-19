import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestion,
  faShieldAlt,
  faShippingFast,
  faStarHalfAlt,
  faWarehouse,
} from "@fortawesome/free-solid-svg-icons";
import banner from "../../../img/solidBg.jpg";

import "./WhyShop.css";

const style = {
  backgroundImage: `url(${banner})`,
  height: "100vh",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  paddingTop: "20px",
};

const WhyShop = () => {
  return (
    <div className="banner-section">
      <h1 className="section-brand">WHY CHOOSE US?</h1>
      <div className="cart-container container-box">
        <div className="cart">
          <div className="cart-info">
            <h1>
              <FontAwesomeIcon icon={faStarHalfAlt} />
            </h1>
            <h2>Quality And Saving</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio,
              ipsum.
            </p>
          </div>
        </div>
        <div className="cart">
          <div className="cart-info">
            <h1>
              <FontAwesomeIcon icon={faWarehouse} />
            </h1>
            <h3>GLOBAL WAREHOUSE</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio,
              ipsum.
            </p>
          </div>
        </div>
        <div className="cart">
          <div className="cart-info">
            <h1>
              <FontAwesomeIcon icon={faShippingFast} />
            </h1>
            <h2>FAST SHIPPING</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio,
              ipsum.
            </p>
          </div>
        </div>
        <div className="cart">
          <div className="cart-info">
            <h1>
              <FontAwesomeIcon icon={faShieldAlt} />
            </h1>
            <h2>PAYMENT SECURITY</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio,
              ipsum.
            </p>
          </div>
        </div>
        <div className="cart">
          <div className="cart-info">
            <h1>
              <FontAwesomeIcon icon={faQuestion} />
            </h1>
            <h2>HAVE QUESTIONS?</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio,
              ipsum.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyShop;
