"use client";
import ReactApexChart from "react-apexcharts";
import { useState, useEffect } from "react";
import axios from "axios";
import SideNavigation from "@/components/sidenavigation/SideNavigation";

const ChartPage = () => {
  const [dataBarang, setDataBarang] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/barang");
        setDataBarang(response.data.data);
        console.log("Berhasil fetch data barang");
      } catch (error) {
        console.log("Error fecth data barang: ", error.message);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    options: {
      labels: dataBarang.map((barang) => barang.namaBarang),
    },
    series: dataBarang.map((barang) => barang.stock),
    colors: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9966"],
  };

  return (
    <div className="flex h-screen bg-white text-gray-500">
      <div className="text-white">
        <SideNavigation />
      </div>
      <h1>Data Barang</h1>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="pie"
      />
    </div>
  );
};

export default ChartPage;
