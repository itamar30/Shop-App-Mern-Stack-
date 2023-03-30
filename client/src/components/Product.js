import React from "react";
import styled from "styled-components";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Link, useLocation } from "react-router-dom";
import { mobile } from "../responsive";

const InfoContainer = styled.div`
  opacity: 0;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);

  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease;
  cursor: pointer;
  flex-direction: column;
`;

const Cotainaer = styled.div`
  width: 350px;
  height: 350px;
  margin: 5px;
  display: flex;
  align-items: flex-start;

  position: relative;
  &:hover ${InfoContainer} {
    opacity: 1;
  }
  border: 1px solid black;
  justify-content: flex-start;
`;

const Circle = styled.div`
  height: 250px;
  width: 250px;
  border-radius: 50%;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
`;

const Image = styled.img`
  flex: 1;
  height: 75%;
  z-index: 2;
  position: relative;
  ${mobile({})}
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;

  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Title = styled.div``;
const Price = styled.div`
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 5px;
`;
const NewContainer = styled.div`
  position: absolute;
  top: 290px;
  left: 40px;
`;

const Product = ({ img, id, title, price }) => {
  return (
    <Cotainaer>
      <Image src={img} />
      <InfoContainer>
        <Icon>
          <Link to={`/product/${id}`}>
            <SearchOutlinedIcon />
          </Link>
        </Icon>
      </InfoContainer>
      <NewContainer>
        <Title>{title}</Title>
        <Price>{price} $</Price>
      </NewContainer>
    </Cotainaer>
  );
};

export default Product;
