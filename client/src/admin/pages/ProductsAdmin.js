import React, { useEffect } from "react";
import { DataGrid, RowsProp, ColDef } from "@material-ui/data-grid";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/apiCalls";
import ProductTable from "../components/ProductTable";
import { Dispatch } from "react";
import Navbar from "../../components/Navbar";
import { mobile } from "../../responsive";

const Container = styled.div`
  padding: 40px;
  background-color: #f5fafd;
  ${mobile({
    padding: 0,
  })}
`;
const ProductsAdmin = () => {
  const dispatch = useDispatch();
  useEffect(() => {}, []);
  return (
    <>
      <Navbar />

      <Container>
        <ProductTable />
      </Container>
    </>
  );
};

export default ProductsAdmin;
