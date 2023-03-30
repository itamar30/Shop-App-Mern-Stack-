import { Badge, Menu } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/userRedux";
import { emptyCart } from "../redux/cartRedux";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Swal from "sweetalert2";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { isMobile } from "../responsive";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import { showNavbar } from "../redux/navbarRedux";
const Container = styled.div`
  height: 60px;
  background-color: #fcf5f5;
  position: relative;
  flex: 10;
  ${mobile({ height: "70px", backgroundColor: "#fcf5f5" })};
`;

const MobileDiv = styled.div`
  display: none;
  ${mobile({
    display: "flex",

    position: "absolute",
    left: 10,
    top: 10,
  })};
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${mobile({ padding: "10px 0px" })}
`;

const TopButton = styled.button`
  font-size: medium;
  width: 200px;
  padding: 10px;
  font-weight: 500;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  ${mobile({
    display: "none",
  })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  display: none;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  display: none;
  ${mobile({ display: "none" })};
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
  ${mobile({ display: "none" })}
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ display: "none" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({
    position: "absolute",
    left: "0px",
    right: "0px",
    top: "3px",
    justifyContent: "flex-end",
    paddingTop: "14px",
    paddingRight: "15px",
  })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "14px" })}
  position: relative;
`;

const SomeDiv = styled.div`
  display: none;
  font-size: 20px;
  ${mobile({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "6px",
    backgroundColor: "#fcf5f5",
    height: "60px",
    fontSize: "20px",
    fontWeight: "bold",
  })}
`;

const Sidebar = styled.div`
  flex: 1;
  height: 100vh;
  background-color: #fcf5f5;
  z-index: 10;
`;

const MobileLogo = styled.span`
  display: none;
  ${mobile({
    display: "flex",
    fontSize: "20px",
    left: 0,
    right: 0,
    margin: "auto",
    fontWeight: "600",
  })}
`;

const IconContainer = styled.div`
  margin-left: 5px;
  margin-top: 3px;
  cursor: pointer;
  ${mobile({
    display: "none",
  })}
`;

const HoverSpan = styled.span`
  z-index: 10;
  opacity: 0;
  &:hover ${MenuItem} {
    opacity: 1;
  }
  position: absolute;
  top: 0;
  left: 0;
  font-size: 30px;
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  const navbar = useSelector((state) => state.navbar.isOn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminPage = location.pathname.includes("Admin");

  const handleAdminButton = () => {
    navigate("/HomeAdmin");
  };

  const handleLogOut = () => {
    user &&
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Succesfully Log Out",
        showConfirmButton: false,
        timer: 1500,
      });
    dispatch(logOut());
    dispatch(emptyCart());
    !user && Swal.fire("You Are Already Logged Out", "", "question");
  };

  const handleRegisterClick = () => {
    user &&
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Log Out first!",
      });
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Left onClick={() => dispatch(showNavbar())}>
            {isAdminPage && !location.pathname.includes("Success") && (
              <IconContainer>
                <AddIcon
                  style={{
                    fontSize: "40px",
                    color: "purple",
                  }}
                />
              </IconContainer>
            )}
            <Language>EN</Language>
            <SearchContainer>
              <Input placeholder="Search" />
              <Search style={{ color: "gray", fontSize: 16 }} />
            </SearchContainer>
          </Left>
          <Center>
            {user ? (
              <Logo> LOGGED AS {user.username.toUpperCase()}</Logo>
            ) : (
              <Logo>SHOPAPP</Logo>
            )}
          </Center>
          <Right>
            {isAdminPage && (
              <MobileDiv onClick={() => dispatch(showNavbar())}>
                <AddIcon style={{ fontSize: "35px", color: "purple" }} />
              </MobileDiv>
            )}
            {!isAdminPage && <MobileLogo>SHOPAPP</MobileLogo>}{" "}
            <Link to="/">
              <MenuItem>
                <HomeIcon />
              </MenuItem>
            </Link>
            {!user && (
              <>
                <MenuItem />

                <Link to="/login" onClick={handleRegisterClick}>
                  <LoginIcon />
                </Link>
              </>
            )}
            {user && (
              <Link to="/">
                <MenuItem onClick={handleLogOut}>
                  <LogoutIcon />
                </MenuItem>
              </Link>
            )}
            {!user && <MenuItem />}{" "}
            {!user && (
              <Link to="/register" onClick={handleRegisterClick}>
                <AccountCircleIcon />
              </Link>
            )}
            <Link to="/cart">
              <MenuItem>
                <Badge
                  badgeContent={quantity}
                  color="primary"
                  overlap="rectangular"
                >
                  <ShoppingCartOutlined />
                </Badge>
              </MenuItem>
            </Link>
            <Link to="/HomeAdmin">
              <MenuItem>
                <DashboardIcon />
              </MenuItem>
            </Link>
          </Right>
        </Wrapper>
      </Container>
      {user && <SomeDiv>LOGGED AS {user?.username.toUpperCase()}</SomeDiv>}{" "}
    </>
  );
};

export default Navbar;
