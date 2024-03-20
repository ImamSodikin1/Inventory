import ReactApexChart from "react-apexcharts";

const PieChart = ({ data }) => {
  const chartData = {
    options: {
      labels: data.map((barang) => barang.namaBarang),
    },
    series: data.map((barang) => barang.stock),
    colors: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9966"],
  };

  return (
    <ReactApexChart
      options={chartData.options}
      series={chartData.series}
      type="pie"
    />
  );
};

export default PieChart;
