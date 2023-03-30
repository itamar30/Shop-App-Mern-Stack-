import React from "react";
import { DataGrid, RowsProp, ColDef } from "@material-ui/data-grid";
import styled from "styled-components";

import UserTable from "../components/UserTable";
import Navbar from "../../components/Navbar";
import { mobile } from "../../responsive";

const Container = styled.div`
  padding: 40px;
  background-color: #f5fafd;
  ${mobile({
    padding: 0,
  })}
`;

const UserListAdmin = () => {
  return (
    <>
      <Navbar />

      <Container>
        <UserTable />
      </Container>
    </>
  );
};

export default UserListAdmin;
