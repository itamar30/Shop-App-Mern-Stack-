import React, { useEffect } from "react";
import Chart from "../components/Chart";
import styled from "styled-components";
import { mobile, isMobile } from "../../responsive";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const MonbileDiv = styled.div`
  ${mobile({ paddingRight: "70px" })}
`;

const ProductChart = ({ data, dataName, dataSales }) => {
  const chartWidth = isMobile() ? 230 : 600;
  useEffect(() => {}, [chartWidth]);

  return (
    <MonbileDiv>
      <LineChart
        style={{ overflowX: "hidden", overflowY: "hidden" }}
        width={chartWidth}
        height={200}
        data={data}
        //   margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey={dataSales} stroke="#8884d8" />

        <XAxis
          dataKey={dataName}
          stroke="#8884d8"
          style={{ fontSize: isMobile && "13px" }}
        />
        <Tooltip />
      </LineChart>
    </MonbileDiv>
  );
};

export default ProductChart;
