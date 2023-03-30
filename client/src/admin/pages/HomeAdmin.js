import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Chart from "../components/Chart";
import { isMobile, mobile } from "../../responsive";
import { trasactionList, newUsers, data } from "../myData";
import Sidebar from "../components/Sidebar";
import { publicRequest, userRequest } from "../../requestMethods";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { ContactSupportOutlined } from "@material-ui/icons";

const Container = styled.div`
  background-color: #f5fafd;
  padding-bottom: 200px;
  padding-top: 30px;

  height: 150vh;
  ::-webkit-scrollbar {
    display: none;
  }
  ${mobile({ paddingBottom: "850px", paddingTop: "30px" })}
`;

const Box = styled.div`
  background-color: whitesmoke;

  height: 150px;
  width: 300px;
  border: 1px solid black;

  flex-direction: column;
  display: flex;
  padding-left: 30px;
  justify-content: space-evenly;

  -webkit-box-shadow: 0px 0px 30px -8px black;
  box-shadow: 0px 0px 30px -8px black;
  ${mobile({ marginBottom: "35px", width: "75vw" })}
`;
const BoxContainer = styled.div`
  display: flex;

  justify-content: space-between;

  ${mobile({
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50px",
    height: "max-content",

    width: "max-content",
    right: 0,
    left: 0,
    margin: "auto",
  })};
`;
const InnerBoxContainer = styled.div`
  display: flex;

  align-items: center;
`;

const OuerBotXontainer = styled.div`
  padding: 40px 0;
`;

const Title = styled.div`
  font-size: 28px;

  font-weight: 600;
`;

const newMembersTtile = styled.div`
  font-size: 28px;
  margin-left: 20px;
  margin-top: 20px;
  font-weight: 600;
`;
const Icon = styled.div`
  margin-left: 10px;
  color: ${(props) => (props.tendency === "up" ? "green" : "red")};
`;
const Number = styled.div`
  font-size: 35px;
  font-weight: 600;
  margin-right: 20px;
`;
const Tendency = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-left: 20px;
`;
const Sentence = styled.div`
  font-size: 17px;
  font-weight: 400;
`;

const NewMeBersContainer = styled.div`
  margin: 0 85px;
  display: flex;
  justify-content: space-between;

  overflow: hidden;
  ${mobile({ flexDirection: "column", margin: "30px" })}
`;

const Small = styled.div`
  background-color: #fcf5f5;

  flex: 3;
  box-shadow: 0px 0px 0px -8px black;
  -webkit-box-shadow: 0px 0px 25px -8px black;
  border: 1px solid black;
  flex-direction: column;
  overflow: hidden;
  height: 500px;
  ${mobile({ height: "max-content" })}
`;
const Large = styled.div`
  flex: 4;
  background-color: #fcf5f5;

  box-shadow: 0px 0px 0px -8px black;
  -webkit-box-shadow: 0px 0px 25px -8px black;
  border: 1px solid black;
  height: 500px;
`;
const Space = styled.div`
  flex: 0.2;
  ${mobile({ marginTop: "40px" })}
`;

const UserContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 15px;
  ::-webkit-scrollbar {
    display: none;
  }
  margin: 15px 15px;
`;

const Img = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;

const NametitleContainer = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Name = styled.div`
  font-size: 20px;
  font-weight: bold;
  ${mobile({ fontSize: "15px" })}
`;
const TabkeRow = styled.div`
  margin-top: 35px;
  margin-left: 20px;
`;

const IconContainer = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #8884d8;
  width: 120px;
  height: 50px;
  border-radius: 25px;
  overflow: hidden;
  margin-top: 15px;
  ${mobile({ width: "90px" })}
`;
const NewMembersTtile = styled.h3`
  font-size: 28px;
  font-weight: 600;
  margin: 20px 20px;
  ${mobile({ display: "none" })}
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const UserTitle = styled.div`
  font-weight: 500;
  font-size: 15px;
  ${mobile({ fontSize: "10px" })}
`;

const TableTitlesContainer = styled.div`
  display: flex;
  margin: 10px 30px;
`;
const CustomerPart = styled.div`
  flex: 2;
  margin-right: 25px;
  ${mobile({ width: "40px", marginRight: "4px" })}
`;
const OtherParts = styled.div`
  flex: 4;
  ${mobile({ marginRight: "8px" })}
`;

const MobileDive = styled.div``;
const MobileDive2 = styled.div``;

const CustomerContainer = styled.div`
  margin-top: 8px;
  margin-right: 10px;
`;
const IconCustomer = styled.img`
  height: 35px;
  width: 35px;
  border-radius: 50%;
  margin-top: 15px;
`;
const NameCustomer = styled.div`
  margin-top: 28px;
  font-weight: bold;
  font-size: 18px;
  margin-left: 15px;
  ${mobile({ margin: "0px", marginTop: "30px", fontSize: "15px" })}
`;
const TableValue = styled.div`
  display: flex;
  font-size: 18px;
  justify-content: flex-start;
  margin-top: 50px;
  ${mobile({
    fontSize: "15px",
    marginRight: "20px",
    marginLeft: "20px",
    flex: "flex-end",
  })}
`;
const TableValueStatus = styled.div`
  padding: 0 5px;
  display: flex;
  font-size: 18px;
  justify-content: flex-start;
  margin-top: 50px;
  width: min-content;
  color: ${(props) => (props.status === "approved" ? "green" : "none")};
  color: ${(props) => (props.status === "declined" ? "red" : "none")};
  color: ${(props) => (props.status === "pending" ? "blue" : "none")};
  background-color: ${(props) =>
    props.status === "approved" ? "#defade" : "none"};
  background-color: ${(props) =>
    props.status === "pending" ? "#bcd2e8" : "none"};
  background-color: ${(props) =>
    props.status === "declined" ? "#FFCCCB " : "none"};
  ${mobile({
    fontSize: "15px",
    marginRight: "20px",
    marginLeft: "20px",
    with: "30px",
  })}
`;

const NameAndTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 17px;
`;

const TableTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  ${mobile({ fontSize: "15px" })}
`;

const UserIcon = styled.div`
  padding-top: 10px;
`;

const TransactionContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TransasctionRow = styled.div`
  flex: 1;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.status === "approved" && "green"};
`;

const TransasctionRowTitle = styled.div`
  flex: 1;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
  ${mobile({
    fontSize: "15px",
  })}
`;
const MobileTitle = styled.div`
  display: none;
  font-size: 30px;
  font-weight: bold;
  margin: 30px 0px;
  ${mobile({
    display: "flex",
  })}
`;

const Rightransactions = styled.div`
  flex: 1;
`;

const DateMobileContainer = styled.div`
  ${mobile({
    paddingRight: "10px",
    paddingLeft: "10px",
  })}
`;
const HomeAdmin = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [revenue, setRevenue] = useState();
  const [userStats, setUserStats] = useState([]);
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);
  const [usersByMonth, setUsersByMonth] = useState([]);
  const [revenuByMonth, setRevenuByMonth] = useState([]);
  const [countFlag, setCountFlag] = useState(0);
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getUsers = async () => {
      try {
        let res = await userRequest.get("users/?new=true");
        res = res.data.sort((a, b) =>
          b.createdAt > a.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0
        );
        res = res.slice(0, 5);
        setUsers(res);
      } catch (error) {
        console.log(error);
      }
    };
    const getOrders = async () => {
      try {
        let res = await userRequest.get("orders");
        setAllOrders(res.data);
        res = res.data.sort((a, b) =>
          b.createdAt > a.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0
        );

        res = res.slice(0, 7);

        setOrders(res);
      } catch (error) {
        console.log(error);
      }
    };

    const getUserStats = async () => {
      try {
        const res = await userRequest.get("users/stats");

        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active users": item.total },
          ])
        );
      } catch (error) {
        console.log(error);
      }
    };
    const getIncome = async () => {
      try {
        const res = await userRequest.get("orders/income");
        setIncome(res.data);

        setPerc((res.data[1].total * 100) / res.data[0].total - 100);
      } catch {}
    };

    const getUsersByMonth = async () => {
      let data = [];

      let res = await publicRequest.get("/users/userByMonths");
      res = res.data;
      for (let i = 0; i <= 11; i++) {
        const found = res.find((item) => item?._id === i + 1);
        if (found !== undefined) {
          data.push({
            name: MONTHS[i],
            users: found?.total,
          });
        } else {
          data.push({
            name: MONTHS[i],
            users: 0,
          });
        }
      }

      setUsersByMonth(data);
    };

    const getRevenueByMonth = async () => {
      let data = [];
      let res = await publicRequest.get("orders/ordersByMonth");
      res = res.data;
      for (let i = 0; i <= 11; i++) {
        const found = res.find((item) => item?._id === i + 1);
        if (found !== undefined) {
          data.push({
            name: MONTHS[i],
            total: found?.total,
          });
        } else {
          data.push({
            name: MONTHS[i],
            total: 0,
          });
        }
      }

      setRevenuByMonth(data);
      setCountFlag((prev) => prev + 1);
    };

    getUsers();
    getOrders();

    getUsersByMonth();
    getRevenueByMonth();
  }, [MONTHS, countFlag]);

  return (
    <>
      <Navbar />
      <Container>
        <Chart data={usersByMonth} title="Users" dataKey="users" grid />
        <Chart data={revenuByMonth} title="Revenue" dataKey="total" grid />
        <NewMeBersContainer>
          {<MobileTitle>New Users </MobileTitle>}
          <Small>
            <NewMembersTtile>New Users</NewMembersTtile>
            {users.map((item) => (
              <UserContainer key={item?._id}>
                <UserIcon>
                  <Img src={item.img || require("../../assets/avatar.jpg")} />
                </UserIcon>
                <NametitleContainer>
                  <Name>{item.username}</Name>
                  <UserTitle>
                    {item.isAdmin === "true" ? "Admin User" : "Regular User"}
                  </UserTitle>
                </NametitleContainer>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/userAdmin/${item?._id}`}
                >
                  <VisibilityIcon
                    style={{ marginTop: "20px", marginRight: "30px" }}
                  />
                </Link>
              </UserContainer>
            ))}
          </Small>
          <Space></Space>
          <MobileTitle>Latest Transactions</MobileTitle>
          <Large>
            <NewMembersTtile>Latest Transactions</NewMembersTtile>
            <TransactionContainer>
              <TransasctionRowTitle>Img</TransasctionRowTitle>
              <TransasctionRowTitle>User</TransasctionRowTitle>
              <TransasctionRowTitle>Amount</TransasctionRowTitle>
              <TransasctionRowTitle>Producs</TransasctionRowTitle>
            </TransactionContainer>
            {orders.map((order) => (
              <TransactionContainer key={order?._id}>
                <TransasctionRow>
                  <IconCustomer
                    style={{ marginTop: "-10px" }}
                    src={order?.userImg || require("../../assets/avatar.jpg")}
                  ></IconCustomer>
                </TransasctionRow>
                <TransasctionRow>{order?.usernname}</TransasctionRow>
                <TransasctionRow>{order?.total} $</TransasctionRow>
                <TransasctionRow>{order?.products.length}</TransasctionRow>
              </TransactionContainer>
            ))}
          </Large>
        </NewMeBersContainer>
      </Container>
    </>
  );
};

export default HomeAdmin;
