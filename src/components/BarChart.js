import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "../sylesheets/barChart.scss";

const BarChart = ({ keywordCounts }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (keywordCounts) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const ctx = document.getElementById("myChart");
      const labels = Object.keys(keywordCounts);
      const data = Object.values(keywordCounts);

      const newChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Occurrences",
              data: data,
              backgroundColor: "#DACDBA",
              borderColor: "#B4C6D6",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      chartRef.current = newChart;
    }
  }, [keywordCounts]);

  return (
    <div className="chart-container">
      <h3 className="chart-title">Occurrences of Keywords In Title</h3>
      <canvas id="myChart" width="300" height="300"></canvas>
    </div>
  );
};

export default BarChart;