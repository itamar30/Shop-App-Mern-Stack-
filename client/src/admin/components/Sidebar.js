import React, { useState } from "react";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BarChartIcon from "@mui/icons-material/BarChart";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import EmailIcon from "@mui/icons-material/Email";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import HomeAdmin from "../pages/HomeAdmin";
import { Link, useLocation } from "react-router-dom";
import { mobile } from "../../responsive";

const Container = styled.div`
  display: flex;
  height: max-content;
  background-color: #f3f3f3;

  ::-webkit-scrollbar {
    display: none;
  }
`;
const Dashbord = styled.div`
  flex: 1;
  padding-left: 20px;
  padding-right: 10px;
  background-color: #f3f3f3;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const OtherPages = styled.div`
  flex: 7;
`;
const Title = styled.div`
  margin: 15px -5px;
  font-weight: bold;
`;
const ItemTitle = styled.div`
  overflow: hidden;
`;
const ItemContainer = styled.div`
  display: flex;

  width: 90%;
  align-items: center;
  border-radius: 20px;
  margin-bottom: 10px;
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: lightgray;
    transform: scale(1.1);
  }
  border: 1px solid black;
  overflow: hidden;
  ${mobile({ width: "180px", textAlign: "center" })}
`;
const Icon = styled.div`
  margin-right: 10px;
  margin-left: 20px;
  overflow: hidden;
`;

const Sidebar = () => {
  const [clicked, setclicked] = useState(false);
  const location = useLocation();
  return !location.pathname.includes("/login") &&
    !location.pathname.includes("/shirts") &&
    !location.pathname.includes("/jeans") &&
    !location.pathname.includes("/coats") &&
    !location.pathname.includes("/cart") &&
    !location.pathname.includes("/register") &&
    !location.pathname.includes("/Success") &&
    location.pathname?.split("/")[1] !== "product" &&
    location?.pathname !== "/" ? (
    <Container>
      <Dashbord>
        <Title>Dahborad</Title>
        <ItemContainer>
          <Icon>
            <HomeIcon />
          </Icon>
          <Link to="/HomeAdmin" style={{ textDecoration: "none" }}>
            <ItemTitle>Home</ItemTitle>
          </Link>
        </ItemContainer>
        {/* <ItemContainer>
          <Icon>
            <ShowChartIcon />
          </Icon>
          <ItemTitle>Analitics</ItemTitle>
        </ItemContainer> */}
        {/* <ItemContainer>
          <Icon>
            <TrendingDownIcon />
          </Icon>
          <ItemTitle>Sales</ItemTitle>
        </ItemContainer> */}
        <Title>Quick Menu</Title>
        <ItemContainer>
          <Icon>
            <PermIdentityIcon />
          </Icon>
          <Link to="/userListAdmin" style={{ textDecoration: "none" }}>
            <ItemTitle>Users</ItemTitle>
          </Link>
        </ItemContainer>
        <ItemContainer>
          <Icon>
            <ProductionQuantityLimitsIcon />
          </Icon>
          <Link to="/productsAdmin" style={{ textDecoration: "none" }}>
            <ItemTitle>Products</ItemTitle>
          </Link>
        </ItemContainer>
        {/* <ItemContainer>
          <Icon>
            <AttachMoneyIcon />
          </Icon>
          <ItemTitle>Transactions</ItemTitle>
        </ItemContainer> */}
        {/* <ItemContainer>
          <Icon>
            <BarChartIcon />
          </Icon>
          <ItemTitle>Reports</ItemTitle>
        </ItemContainer>
        <Title>Notiifctions</Title>
        <ItemContainer>
          <Icon>
            <EmailIcon />
          </Icon>
          <ItemTitle>Mail</ItemTitle>
        </ItemContainer> */}
        {/* <ItemContainer>
          <Icon>
            <BarChartIcon />
          </Icon>
          <ItemTitle>Feedback</ItemTitle>
        </ItemContainer>
        <ItemContainer>
          <Icon>
            <ChatBubbleOutlineIcon />
          </Icon>
          <ItemTitle>Messages</ItemTitle>
        </ItemContainer> */}
      </Dashbord>
      {/* <OtherPages></OtherPages> */}
    </Container>
  ) : null;
};

export default Sidebar;
