import React from "react";
import styled from "styled-components";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Link, useLocation } from "react-router-dom";

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
`;

const Cotainaer = styled.div`
  background-color: #e2f1f7;
  width: 350px;
  height: 350px;
  margin: 5px;
  display: flex;
  align-items: center;
  justify-items: center;
  position: relative;
  &:hover ${InfoContainer} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  background-color: white;
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

const Product = ({ img, id }) => {
  return (
    <Cotainaer>
      <Circle />
      <Image src={img} />
      <InfoContainer>
        <Icon>
          <Link to={`/product/${id}`}>
            <SearchOutlinedIcon />
          </Link>
        </Icon>
      </InfoContainer>
    </Cotainaer>
  );
};

export default Product;
