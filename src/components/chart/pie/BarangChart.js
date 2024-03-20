import Chart from "react-apexcharts";
import { useState, useEffect } from "react";
import axios from "axios";

const BarangChart = () => {
  const [dataBarang, setDataBarang] = useState([]);
  const [options, setOptions] = useState({
    labels: [],
  });

  return (
    <div>
      <Chart
        type="pie"
        width={550}
        height={550}
        series={[23, 23, 45, 46, 47]}
        options={{
          labels: ["Indonesia", "Jerman", "Inggris"],
          noData: { text: "empty Data" },
        }}
      ></Chart>
    </div>
  );
};

export default BarangChart;
