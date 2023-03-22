import React from "react";
import styled from "styled-components";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsIcon from "@mui/icons-material/Settings";
import LanguageIcon from "@mui/icons-material/Language";
import { Badge, Menu } from "@material-ui/core";
import { useLocation, useNavigate } from "react-router";
import { mobile } from "../../responsive";

const Container = styled.div`
  width: 100%;
  ::-webkit-scrollbar {
    display: none;
  }
  background-color: #f3f3f3;
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 40px;
  width: 95%;
  overflow-y: hidden;
  ${mobile({ width: "85%" })}
`;
const Circle = styled.div`
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background-color: red;
  z-index: 3;
  position: absolute;
  top: -2px;
  right: 0;
  color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TopLeft = styled.div`
  color: blue;
  font-size: 30px;
  font-weight: bold;
`;

const TopRight = styled.div``;

const Img = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-left: 10px;
`;

const IconsContainer = styled.div`
  display: flex;
`;

const Icon = styled.div`
  padding: 8px;
  position: relative;
`;

const TopButton = styled.button`
  font-size: medium;

  padding: 8px;
  font-weight: 500;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  text-align: center;

  ${mobile({})}
`;

const Topbar = () => {
  const navigate = useNavigate();

  const handleAdminButton = () => {
    navigate("/");
  };

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
      <TopWrapper>
        <TopLeft>
          <TopButton type="filled" onClick={handleAdminButton}>
            GO TO SHOP
          </TopButton>
        </TopLeft>

        <TopRight>
          <IconsContainer>
            <Icon>
              <NotificationsNoneIcon />
            </Icon>

            <Icon>
              <SettingsIcon />
            </Icon>
            <Icon>
              <LanguageIcon />
            </Icon>
            <Img src={require("../assets/me.jpeg")} />
          </IconsContainer>
        </TopRight>
      </TopWrapper>
    </Container>
  ) : null;
};

export default Topbar;
