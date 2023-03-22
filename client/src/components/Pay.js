import React, { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { mobile, isMobile } from "../responsive";
import Swal from "sweetalert2";

const Pay = () => {
  const user = useSelector((state) => state.user.currentUser);
  console.log(user?.email);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const total = useSelector((state) => state.cart.total);

  const onToken = (token) => {
    setStripeToken(token);
  };

  const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
    ${mobile({ marginBottom: "10px" })}
  `;

  const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  useEffect(() => {
    const makePayment = async () => {
      try {
        const res = await axios.post(
          "https://shop-app-server-y65y.onrender.com/api/stripe/payment",
          {
            tokenId: stripeToken.id,
            amount: total,
          }
        );
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "Payment Succeded",
        });
        navigate("/Success", {
          state: { ...res.data },
        });
      } catch (error) {
        console.log(error);
      }
    };
    stripeToken && makePayment();
  }, [stripeToken]);
  return (
    <Container>
      <StripeCheckout
        name={"Hello " + user?.username || "GUEST"}
        email="itamar.berti8@gmail.com"
        description={`Your total is ${total} $`}
        amount={total * 100}
        token={onToken}
        stripeKey="pk_test_51MZWbfFpcWmVWIy1QLVJef7AofhJx2sPWPofUz2kNtis3Kc8HCDxUyx4PnTIU4oy3eZLzl2YRIONbAJBFDYZ1t7v00n8Jf730F"
      >
        <Button
          style={{ marginTop: "20px", marginBottom: "3px" }}
          onClick={() => {
            const pos = isMobile() ? "bottom" : "top-right";
            Swal.fire({
              position: pos,
              icon: "info",
              title: "Use Following Card to Pay",
              text: "4242-4242-4242-4242 \n 12/34 \n any 3 digits",
              footer: "Make Sure transaction is not 0 $",
              showConfirmButton: true,
            });
          }}
        >
          CHECKOUT NOW
        </Button>
      </StripeCheckout>
    </Container>
  );
};

export default Pay;
