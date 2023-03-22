import React, { useEffect } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import Pay from "../components/Pay";
import { useNavigate } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { addProduct, removeProdeuct } from "../redux/cartRedux";
const KEY =
  "pk_test_51MZWbfFpcWmVWIy1QLVJef7AofhJx2sPWPofUz2kNtis3Kc8HCDxUyx4PnTIU4oy3eZLzl2YRIONbAJBFDYZ1t7v00n8Jf730F";
console.log("KEY ", KEY);

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  ${mobile({ left: 0, right: 0, margin: "auto" })}
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Image = styled.img`
  width: 200px;
  ${mobile({
    width: "300px",
    left: 0,
    right: 0,
    margin: "auto",
    height: "300px",
    marginTop: "30px",
  })}
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  ${mobile({
    left: 0,
    right: 0,
    margin: "auto",
    padding: "30px",
  })}
`;

const ProductName = styled.span`
  ${mobile({ marginBottom: "15px" })}
`;

const ProductId = styled.span`
  ${mobile({ marginBottom: "15px" })}
`;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: ${(props) => (props.color === "White" ? " 1px solid black" : "none")};
  ${mobile({ marginBottom: "15px" })}
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${mobile({
    flexDirection: "row",
    justifyContent: "space-around",
  })}
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
  text-align: center;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;
const Icon = styled.div`
  margin-top: 15px;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.2);
  }
  ${mobile({ marginTop: "-20px" })}
`;

const SomeDiv = styled.div`
  ${mobile({
    flexDirection: "row",
  })}
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  let quantity = useSelector((state) => state.cart.quantity);

  const products = useSelector((state) => state.cart.products);
  var total = useSelector((state) => state.cart.total);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handkeContinueButton = () => {
    navigate("/");
  };

  const handleRemoveProduct = (p) => {
    dispatch(removeProdeuct(p));
  };

  useEffect(() => {}, []);
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR PRCHASE</Title>
        <Top>
          <TopButton onClick={handkeContinueButton}>
            CONTINUE SHOPPING
          </TopButton>
          <TopTexts>
            <TopText>{`Shopping Bag (${quantity})`}</TopText>
            <TopText>{`Whishlist (0)`}</TopText>
          </TopTexts>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product, index) => (
              <div key={index}>
                <Product>
                  <ProductDetail>
                    <Image src={product.img} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {product.title}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {product._id}
                      </ProductId>
                      <ProductColor color={product.color} />
                      <ProductSize>
                        <b>Size:</b> {product.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>

                  <PriceDetail>
                    <ProductAmountContainer>
                      <ProductAmount>{product.quantity}</ProductAmount>
                    </ProductAmountContainer>
                    <ProductPrice>
                      $ {product.price * product.quantity}
                    </ProductPrice>
                    <Icon
                      onClick={() => handleRemoveProduct(cart.products[index])}
                    >
                      <DeleteForeverIcon
                        style={{
                          fontSize: 30,
                          cursor: "pointer",
                        }}
                      />
                    </Icon>
                  </PriceDetail>
                </Product>
                <Hr />
              </div>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>+ $ {30}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>- $ {30}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {total}</SummaryItemPrice>
            </SummaryItem>
            <Pay />
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
