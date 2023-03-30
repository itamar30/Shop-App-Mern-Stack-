import React from "react";
import HomeAdmin from "../admin/pages/HomeAdmin";
import UserListAdmin from "../admin/pages/UserListAdmin";
import UserAdmin from "../admin/pages/UserAdmin";
import NewUserAdmin from "../admin/pages/NewUserAdmin";
import ProductsAdmin from "../admin/pages/ProductsAdmin";
import ProductAdmin from "../admin/pages/ProductAdmin";
import NewProductAdmin from "../admin/pages/NewProductAdmin";

import styled from "styled-components";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const Container = styled.div`
  background-color: #f3f3f3;
  padding-bottom: 60px;
`;
const InnerComtainer = styled.div`
  display: flex;
  background-color: #f3f3f3;
`;

const OtherPages = styled.div`
  flex: 9;
  overflow: hidden;
  background-color: #f3f3f3;
`;
const Dashborad = styled.div`
  flex: 1.3;
  background-color: #f3f3f3;
`;

const AdminRouter = () => {
  return (
    <Routes>
      <Route exact path="/" element={<HomeAdmin />} />
      <Route path="userListAdmin" element={<UserListAdmin />} />
      <Route path="/userAdmin/:id" element={<UserAdmin />} />
      <Route path="/newUserAdmin" element={<NewUserAdmin />} />
      <Route path="/productsAdmin" element={<ProductsAdmin />} />
      <Route path="/productAdmin/:id" element={<ProductAdmin />} />
      <Route path="/newProductAdmin" element={<NewProductAdmin />} />
    </Routes>
  );
};

export default AdminRouter;
