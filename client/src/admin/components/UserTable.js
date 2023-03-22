import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { userRows } from "../myData";
import styled from "styled-components";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { fontSize } from "@mui/system";
import { Link } from "react-router-dom";
import { userRequest } from "../../requestMethods";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import UserListAdmin from "../pages/UserListAdmin";

const useStyles = makeStyles({
  table: {
    backgroundColor: "#f3f3f3",
  },
});

function createData(id, avatar, username, email, status, transaction) {
  return { id, avatar, username, email, status, transaction };
}

export default function UserTable() {
  const classes = useStyles();
  const [userFlag, setuserFlag] = useState(false);
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
    background-color: green;
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
  const [usersState, setusersState] = useState(userRows);

  useEffect(() => {
    const getUsers = async () => {
      const res = await userRequest("users");
      setusersState(res.data);
    };
    getUsers();
  }, [userFlag]);
  const user = useSelector((state) => state.user.currentUser);

  const handleDeleteClick = async (id) => {
    if (user?.isAdmin) {
      setuserFlag((prev) => !prev);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User Deleted Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      const res = await userRequest.delete("/users/" + id);
    } else if (user === null || !user.isAdmin) {
      Swal.fire(
        "LOG IN AS ADMIN PLEASE",
        "you are not alowed to do that",
        "question"
      );
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>avatar</TableCell>
            <TableCell>username</TableCell>
            <TableCell>email</TableCell>
            <TableCell>status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersState.map((row) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                {row._id}
              </TableCell>
              <TableCell>
                <Img src={row.img || require("../../assets/avatar.jpg")} />
              </TableCell>
              <TableCell>{row.username}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>
                {row.isAdmin === true ? "Admin" : "Regular User"}
              </TableCell>

              <TableCell>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                  }}
                >
                  <Link to={"/userAdmin/" + row._id}>
                    <MyButton>EDIT</MyButton>
                  </Link>
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
}
