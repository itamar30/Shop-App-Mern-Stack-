import React from "react";

import Categories from "../components/Categories";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Slider from "../components/Slider";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import AnounceMent from "../components/Announcement";
import Success from "../components/Success";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useNavigate } from "react-router";

const TopButton = styled.button`
  font-size: medium;
  width: 200px;
  padding: 20px;
  font-weight: 500;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  text-align: center;
  display: none;

  ${mobile({
    display: "flex",
    left: 0,
    right: 0,
    margin: "auto",
    marginTop: "30px",
    marginBottom: "30px",
    fontSize: "20px",
    width: "85%",
    textAlign: "center",
  })}
`;

const Home = () => {
  const navigate = useNavigate();

  const handleAdminButton = () => {
    navigate("/HomeAdmin");
  };
  return (
    <div>
      <Navbar />
      <AnounceMent />
      <Slider />
      <Categories />
      {/* <Products /> */}
      <TopButton type="filled" onClick={handleAdminButton}>
        MANAGE YOUR STORE NOW !
      </TopButton>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
