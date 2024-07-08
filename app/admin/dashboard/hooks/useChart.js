"use client";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const useChart = (chartRef, chartData, soldItems) => {
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: "Items Sold",
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
            data: chartData.soldData,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
          title: {
            display: true,
            text: `Products Sold: ${soldItems} `,
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return tooltipItem.label + ": " + tooltipItem.raw.toFixed(2);
              },
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Products",
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Number of Items Sold",
            },
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [chartRef, chartData, soldItems]);

  return chartInstanceRef;
};

export default useChart;
