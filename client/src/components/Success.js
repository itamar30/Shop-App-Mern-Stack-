import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { emptyCart } from "../redux/cartRedux";
import { userRequest } from "../requestMethods";
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: hidden;
  ${mobile({ overflow: "scroll" })}
`;

const InnerContainer = styled.div`
  background-color: white;
  height: 90%;
  width: 40%;
  ${mobile({ width: "85%" })}

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 30px;
  border: 1px solid black;
  margin: 50px;
  ${mobile({
    margin: "0px",
    justifyContent: "flex-start",
    height: "600px",
    marginRight: "20px",
    marginLeft: "20px",
  })}
`;

const Button = styled.button`
  width: 50%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: large;
  ${mobile({ width: "70%" })}
`;

const Title = styled.div`
  font-size: 40px;
  color: #00b992;
  ${mobile({ fontSize: "30px" })}
`;
const Form = styled.div`
  flex: 1;
  width: 100%;
  background-color: white;
  margin-bottom: 20px;
  ${mobile({
    alignItems: "flex-start",
    flex: 0.5,
    margin: 0,
  })}

  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const FormLeft = styled.div`
  flex: 1;
  height: 100%;
  padding-left: 30px;
  font-size: 20px;
  flex-direction: column;
  display: flex;
  justify-content: space-evenly;
  ${mobile({ height: "60%" })}
`;
const FormRight = styled.div`
  flex: 1;
  font-weight: bold;
  height: 100%;
  text-align: right;
  padding-right: 30px;
  flex-direction: column;
  display: flex;
  justify-content: space-evenly;
  ${mobile({ height: "60%" })}
`;

const InputFormRight = styled.div`
  font-size: 20px;
  ${mobile({ fontSize: "10px" })}
`;

const InputFormLeft = styled.div`
  font-size: 20px;
  ${mobile({ fontSize: "10px" })}
`;

const Icon = styled.div`
  ${mobile({ margin: "0px", height: "100px" })}
`;

const Success = () => {
  const location = useLocation();
  const cart = useSelector((state) => state.cart);
  const transactionDEtails = location.state;
  const dispatch = useDispatch();
  useEffect(() => {
    postOrder();
  }, [location, transactionDEtails]);
  const navigate = useNavigate();

  const postOrder = async () => {
    const res = await userRequest.post("/orders", {
      userId: user?._id || "Guest",
      userImg: user?.img,
      usernname: user?.username || "Guest",
      products: cart.products,
      total: cart.total,
    });
    console.log(res.data);
  };
  const handleClick = () => {
    dispatch(emptyCart());

    navigate("/");
  };
  let quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Container>
      <InnerContainer>
        <Title>Your Receipt</Title>

        <Form>
          <FormLeft>
            <InputFormRight>User</InputFormRight>
            <InputFormRight> Amount Paid</InputFormRight>
            <InputFormRight> Transacion Id</InputFormRight>
          </FormLeft>
          <FormRight>
            {user ? (
              <InputFormLeft>{user.username}</InputFormLeft>
            ) : (
              <InputFormLeft>guest</InputFormLeft>
            )}
            <InputFormLeft>{transactionDEtails.amount} $</InputFormLeft>
            <InputFormLeft>{transactionDEtails.id}</InputFormLeft>
          </FormRight>
        </Form>
        <Button onClick={handleClick}>GO BACK HOME</Button>
      </InnerContainer>
    </Container>
  );
};

export default Success;
