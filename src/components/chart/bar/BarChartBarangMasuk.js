// import axios from "axios";
// import {
//   Chart as ChartJS2,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { useState } from "react";
// import { Bar } from "react-chartjs-2";

// ChartJS2.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "top",
//     },
//     title: {
//       display: true,
//       text: "Barang Masuk",
//     }
//   }
// }

// const BarChartBarang = () => {
//   const [dataBarangMasuk, setDataBarangMasuk] = useState([]);

//   const fetchDataBarangMasuk = async () => {
//     try {
//       const response = await axios.get("api/barangmasuk");
//       setDataBarangMasuk(response.data.data);
//     }
//   }

// }