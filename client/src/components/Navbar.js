import { Badge, Menu } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/userRedux";
import { emptyCart } from "../redux/cartRedux";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Swal from "sweetalert2";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px", backgroundColor: "#fcf5f5" })}
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
    justifyContent: "space-evenly",
    paddingTop: "14px",
    paddingRight: "15px",
  })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "14px" })}
`;

const SomeDiv = styled.div`
  display: none;
  ${mobile({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "6px",
    backgroundColor: "#fcf5f5",
    height: "60px",
    fontSize: "28px",
    fontWeight: "bold",
  })}
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAdminButton = () => {
    navigate("/HomeAdmin");
  };

  const handleLogOut = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Succesfully Log Out",
      showConfirmButton: false,
      timer: 1500,
    });
    dispatch(logOut());
    dispatch(emptyCart());
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
          <Left>
            <Language>EN</Language>
            <SearchContainer>
              <Input placeholder="Search" />
              <Search style={{ color: "gray", fontSize: 16 }} />
            </SearchContainer>
            <TopButton type="filled" onClick={handleAdminButton}>
              GO TO DASHBORAD
            </TopButton>
          </Left>
          <Center>
            {user ? (
              <Logo> LOGGED AS {user.username.toUpperCase()}</Logo>
            ) : (
              <Logo>SHOPAPP</Logo>
            )}
          </Center>
          <Right>
            <Link to="/register" onClick={handleRegisterClick}>
              <MenuItem>REGISTER</MenuItem>
            </Link>
            <Link to="/login" onClick={handleRegisterClick}>
              <MenuItem>LOG IN</MenuItem>
            </Link>
            <Link to="/">
              <MenuItem onClick={handleLogOut}>LOG OUT</MenuItem>
            </Link>
            <MenuItem></MenuItem>
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
          </Right>
        </Wrapper>
      </Container>
      {user && <SomeDiv>LOGGED AS {user?.username.toUpperCase()}</SomeDiv>}{" "}
    </>
  );
};

export default Navbar;
