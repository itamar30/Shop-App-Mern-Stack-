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
import { useSelector } from "react-redux";

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

function App() {
  const user = useSelector((state) => state.user.currentUser);

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
      <Container>
        <Topbar />
        <InnerComtainer>
          <Dashborad>
            <Sidebar />
          </Dashborad>
          <OtherPages>
            <MobileDiv>
              <Sidebar />
            </MobileDiv>
            <Routes>
              <Route path="/HomeAdmin" element={<HomeAdmin />} />
              <Route path="userListAdmin" element={<UserListAdmin />} />

              <Route path="/userAdmin/:id" element={<UserAdmin />} />
              <Route path="/newUserAdmin" element={<NewUserAdmin />} />
              <Route path="/productsAdmin" element={<ProductsAdmin />} />
              <Route path="/productAdmin/:id" element={<ProductAdmin />} />
              <Route path="/newProductAdmin" element={<NewProductAdmin />} />
            </Routes>
          </OtherPages>
        </InnerComtainer>
      </Container>
    </Router>
  );
}

export default App;
