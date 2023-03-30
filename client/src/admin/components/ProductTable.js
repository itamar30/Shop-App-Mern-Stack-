import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { productRows } from "../myData";
import styled from "styled-components";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { fontSize } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { publicRequest, userRequest } from "../../requestMethods";
import Swal from "sweetalert2";

const useStyles = makeStyles({
  table: {
    backgroundColor: "#f5fafd",
  },
});

function createData(id, avatar, username, email, status, transaction) {
  return { id, avatar, username, email, status, transaction };
}

const Img = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 50%;
`;

const Icon = styled.div`
  margin-left: 20px;
  cursor: pointer;
  margin-top: 4px;
  &:hover {
    background-color: lightgray;
  }
`;

const MyButton = styled.div`
  background-color: purple;
  color: white;
  padding: 3px;
  width: 70px;
  height: 35px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 400;
  cursor: pointer;
`;
const ProductTable = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.user.currentUser);

  const [productState, setProductStte] = useState([]);
  const [productsFleg, setproductsFleg] = useState(false);
  const navigate = useNavigate();
  const handleDeleteClick = async (id) => {
    if (user?.isAdmin) {
      const res = await userRequest.delete("/products/" + id);
      console.log(res.data);
      setproductsFleg((prev) => !prev);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Product Deleted Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (user === null || !user.isAdmin) {
      {
        Swal.fire(
          "LOG IN AS ADMIN PLEASE",
          "you are not alowed to do that",
          "question"
        );
      }
    }
  };

  const handleEditClick = (id) => {
    console.log(id);
    navigate("/productAdmin/" + id);
  };
  useEffect(() => {
    const getProducts = async () => {
      const res = await userRequest.get("/products");
      setProductStte(res.data);
      console.log(res.data);
      setproductsFleg(true);
    };
    getProducts();
  }, [productsFleg]);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>img</TableCell>
            <TableCell>name</TableCell>

            <TableCell>price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productState.map((row) => (
            <TableRow key={Math.random()}>
              <TableCell>
                <Img src={row?.img} />
              </TableCell>
              <TableCell>{row?.title}</TableCell>

              <TableCell>{row?.price}</TableCell>
              <TableCell>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                  }}
                >
                  <MyButton onClick={() => handleEditClick(row?._id)}>
                    EDIT
                  </MyButton>

                  <Icon onClick={() => handleDeleteClick(row?._id)}>
                    <DeleteForeverIcon style={{ fontSize: "30px" }} />
                  </Icon>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
