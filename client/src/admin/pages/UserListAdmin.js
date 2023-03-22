import React from "react";
import { DataGrid, RowsProp, ColDef } from "@material-ui/data-grid";
import styled from "styled-components";

import UserTable from "../components/UserTable";

const Container = styled.div`
  margin: 40px 40px;
`;

const UserListAdmin = () => {
  return (
    <Container>
      <UserTable />
    </Container>
  );
};

export default UserListAdmin;
