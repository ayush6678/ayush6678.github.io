import React from "react";
import { Chart } from "react-google-charts";


function Testing() {


     const data = [
        ["Year", "Sales", "Expenses", "Profit"],
        ["2014", 1000, 400, 200],
        ["2015", 1170, 460, 250],
        ["2016", 660, 1120, 300],
        ["2017", 1030, 540, 350],
      ];

      
  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={data}
    />
  );
}
export default Testing;