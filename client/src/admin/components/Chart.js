import styled from "styled-components";
import React, { PureComponent, useEffect } from "react";
import { mobile, isMobile } from "../../responsive";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
} from "recharts";

const Container = styled.div`
  height: 250px;

  -webkit-box-shadow: 0px 0px 30px -8px black;
  box-shadow: 0px 0px 30px -8px black;
  border: 1px solid black;

  background-color: #fcf5f5;

  margin: 85px;
  margin-top: 55px;
  padding-top: 10px;
  padding-left: 20px;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  ${mobile({ flexDirection: "column", margin: "30px", marginBottom: "60px" })}
`;

const HideScrollBar = styled.div`
  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;
const Title = styled.h3`
  font-size: 28px;
  font-weight: 600;
`;

const Chart = ({ data, title, dataKey, grid }) => {
  let chartWidth = isMobile() ? 320 : 1250;
  let paddingLeft = isMobile() ? 10 : 40;
  useEffect(() => {}, [chartWidth, paddingLeft]);
  return (
    <Container>
      <Title>{title}</Title>

      <ResponsiveContainer width={chartWidth}>
        <LineChart
          style={{ overflowY: "hidden", scrollY: "no" }}
          data={data}
          margin={{
            top: 40,
            right: 40,
            left: paddingLeft,
            bottom: 60,
          }}
        >
          <XAxis dataKey="name" />

          {grid && <CartesianGrid strokeDasharray="5 5" />}
          <XAxis dataKey={dataKey} stroke="#8884d8" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default Chart;
