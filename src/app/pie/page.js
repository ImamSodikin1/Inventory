"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { PieChart } from "react-chartkick";

const BarangMasukPieChart = () => {
  const [barangMasuk, setBarangMasuk] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("api/barangmasuk");
        setBarangMasuk(response.data.data);
        console.log("Berhasil get barang masuk");
      } catch (error) {
        console.log("Error get barang masuk: ", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const createChartData = () => {
      const data = barangMasuk.map((item) => {
        return {
          name: item.namaBarang,
          data: item.quantity,
        };
      });
      setChartData(data);
    };

    createChartData();
  }, [barangMasuk]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-5">
        <h1 className="text-2xl font-bold mb-5">Barang Masuk Pie Chart</h1>
        <div className="bg-white p-5 rounded shadow">
          <PieChart data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default BarangMasukPieChart;
