import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProductList from "./pages/ProductList";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Success from "./components/Success";
import Pay from "./components/Pay";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";
import HomeAdmin from "./admin/pages/HomeAdmin";
import UserListAdmin from "./admin/pages/UserListAdmin";
import UserAdmin from "./admin/pages/UserAdmin";
import NewUserAdmin from "./admin/pages/NewUserAdmin";
import ProductsAdmin from "./admin/pages/ProductsAdmin";
import ProductAdmin from "./admin/pages/ProductAdmin";
import NewProductAdmin from "./admin/pages/NewProductAdmin";
import Sidebar from "./admin/components/Sidebar";
import Topbar from "./admin/components/Topbar";
import { useLocation } from "react-router-dom";
import { mobile } from "./responsive";
import CloseIcon from "@mui/icons-material/Close";
import { dontShowNavbar } from "./redux/navbarRedux";
import { Link } from "react-router-dom";
const Container = styled.div`
  background-color: #f3f3f3;
  overflow-x: hidden;
`;
const InnerComtainer = styled.div`
  display: flex;
  background-color: #f3f3f3;
`;

const OtherPages = styled.div`
  flex: 9;
  overflow-x: hidden;
  background-color: #f3f3f3;
`;
const Dashborad = styled.div`
  flex: 1.3;
  background-color: #f3f3f3;
  overflow-x: hidden;
  ${mobile({ display: "none" })}
`;
const MobileDiv = styled.div`
  display: none;
  z-index: 20;
  ${mobile({ display: "flex", marginBottom: "40px" })}
`;

const InnerContainer = styled.div`
  position: relative;
`;

const SidBarContiner = styled.div``;

const SideBarItem = styled.div`
  color: purple;
  border: 1px solid black;
  text-align: center;
  border-radius: 20px;
  padding: 10px;
  cursor: pointer;
  margin: 40px 40px;
  &:hover {
    color: black;
  }
  font-size: 30px;
  ${mobile({
    fontSize: "20px",
    marginTop: "20px",
    marginBottom: "20px",
  })}
`;

const SideBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 400px;
  height: 95vh;
  z-index: 10;
  transition: 2s ease;

  background-color: #fcf5f5;
  ${mobile({
    height: "700px",
    width: "380px",
    zIndex: 10,
    marginRight: "10px",
  })}
`;

const CloseIconDiv = styled.div`
  font-size: 40px;
  margin-left: 20px;
  margin-top: 5px;
  ${mobile({
    height: "600px",
    width: "300px",
    zIndex: 10,
    marginRight: "10px",
  })}
`;

function App() {
  const user = useSelector((state) => state.user.currentUser);
  const navbar = useSelector((state) => state.navbar.isOn);
  const dispatch = useDispatch();
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact="/pay" element={<Pay />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />

        <Route
          path="/login"
          element={
            user?.isAdmin ? (
              <Navigate to="/HomeAdmin" />
            ) : user ? (
              <Navigate to="/" />
            ) : (
              <Login />
            )
          }
        />
        <Route path="/Success" element={<Success />} />

        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
      </Routes>
      <InnerContainer>
        {navbar && (
          <SideBar>
            <CloseIconDiv>
              <CloseIcon
                onClick={() => dispatch(dontShowNavbar())}
                style={{
                  fontSize: "40px",
                  marginLeft: "10px",
                  marginTop: "15px",
                  color: "purple",
                }}
              />
              <SidBarContiner>
                <Link style={{ textDecoration: "none" }} to="HomeAdmin">
                  <SideBarItem>HOME</SideBarItem>
                </Link>
                <Link style={{ textDecoration: "none" }} to="userListAdmin">
                  <SideBarItem>USERS</SideBarItem>
                </Link>
                <Link style={{ textDecoration: "none" }} to="productsAdmin">
                  <SideBarItem>PRODCUTS</SideBarItem>
                </Link>

                <Link style={{ textDecoration: "none" }} to="NewUserAdmin">
                  <SideBarItem>NEW USER</SideBarItem>
                </Link>
                <Link style={{ textDecoration: "none" }} to="NewProductAdmin">
                  <SideBarItem>NEW PRODCUT</SideBarItem>
                </Link>
              </SidBarContiner>
            </CloseIconDiv>
          </SideBar>
        )}
        <Routes>
          <Route path="/HomeAdmin" element={<HomeAdmin />} />
          <Route path="userListAdmin" element={<UserListAdmin />} />

          <Route path="/userAdmin/:id" element={<UserAdmin />} />
          <Route path="/newUserAdmin" element={<NewUserAdmin />} />
          <Route path="/productsAdmin" element={<ProductsAdmin />} />
          <Route path="/productAdmin/:id" element={<ProductAdmin />} />
          <Route path="/newProductAdmin" element={<NewProductAdmin />} />
        </Routes>
      </InnerContainer>
    </Router>
  );
}

export default App;
