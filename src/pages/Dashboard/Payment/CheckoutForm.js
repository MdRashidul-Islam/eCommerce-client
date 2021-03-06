import React, { useEffect, useState } from "react";
import {
  cardElement,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { CircularProgress } from "@mui/material";

const CheckoutForm = ({ products }) => {
  const { price, name, email, _id } = products;
  const stripe = useStripe();
  const elements = useElements();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetch(
      "https://infinite-wildwood-62452.herokuapp.com/create-payment-intent",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ price }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, [price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    setProcessing(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setError(error.message);
      setSuccess("");
    } else {
      setError("");
      console.log(paymentMethod);
    }
    //payment intent
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: name,
            email: email,
          },
        },
      });
    if (intentError) {
      setError(intentError.message);
      setSuccess("");
    } else {
      setError("");
      setSuccess("Your payment was successfully");
      console.log(paymentIntent);
      setProcessing(false);

      //save to database
      const payment = {
        amount: paymentIntent.amount,
        transaction: paymentIntent.client_secret.slice("_secret")[0],
        created: paymentIntent.created,
      };

      const url = `https://infinite-wildwood-62452.herokuapp.com/myProducts/${_id}`;
      fetch(url, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        {processing ? (
          <CircularProgress />
        ) : (
          <button
            className="cart-btn"
            type="submit"
            disabled={!stripe || success}
          >
            Pay ${price}
          </button>
        )}
      </form>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </div>
  );
};

export default CheckoutForm;
