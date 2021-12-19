import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import "./Payment.css";

const stripePromise = loadStripe(
  "pk_test_51K84IgEzVopus8oCtPl0mGu2K9SP3t8eveXXgIjd6nOacllgwSIvP93ok66XRu01yPq0eDJKCvrReIdaQ4R3XRdm00qJ0oOhTI"
);

const Payment = () => {
  const { _id } = useParams();
  console.log(_id);
  const [products, setProducts] = useState([]);

  console.log(products);

  useEffect(() => {
    fetch(`http://localhost:5000/myProducts/${_id}`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [_id]);

  return (
    <div className="payment-info">
      <h1>Pay for {products.productName}</h1>
      <h1>Pay: $ {products.price}</h1>

      {products?.price && (
        <Elements stripe={stripePromise}>
          <CheckoutForm products={products} />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
