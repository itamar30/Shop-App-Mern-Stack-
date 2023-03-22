import React, { useEffect } from "react";
import { DataGrid, RowsProp, ColDef } from "@material-ui/data-grid";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/apiCalls";
import ProductTable from "../components/ProductTable";
import { Dispatch } from "react";

const Container = styled.div`
  margin: 40px 40px;
`;

const ProductsAdmin = () => {
  const dispatch = useDispatch();
  useEffect(() => {}, []);
  return (
    <Container>
      <ProductTable />
    </Container>
  );
};

export default ProductsAdmin;
