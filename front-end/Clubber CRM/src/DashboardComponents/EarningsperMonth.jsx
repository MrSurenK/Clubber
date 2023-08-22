import React, { useEffect, useState, useRef } from "react";
import useFetch from "../hooks/useFetch";
import { Typography } from "@mui/material";
import Chart from "chart.js/auto";

const EarningsperMonth = () => {
  const [transactions, setTransactions] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchData = useFetch();

  const chartRef = useRef();

  // GET for all transactions
  const getTransactions = async () => {
    const res = await fetchData("/transactions");

    if (res.ok) {
      setTransactions(res.data);
      // Fetch product data
      const productRes = await fetchData("/products");
      if (productRes.ok) {
        setProducts(productRes.data); // Assuming products are stored in state using `setProducts`
      }
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const calculateMonthlyTotals = () => {
    const currentDate = new Date(); // Replace this with your actual date handling logic
    const sixMonthsAgo = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 5,
      1
    );

    const monthlyTotals = {};

    transactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.transactionDate);
      if (transactionDate >= sixMonthsAgo) {
        const monthKey = transactionDate.toLocaleString("en-US", {
          year: "numeric",
          month: "short",
        });

        const product = products.find(
          (p) => p.productId === transaction.productId
        );
        const transactionAmount = product ? product.productPrice : 0; // Use a fallback value of 0 if product is not found

        monthlyTotals[monthKey] =
          (monthlyTotals[monthKey] || 0) + transactionAmount;
      }
    });

    return monthlyTotals;
  };

  const formatChartData = (monthlyTotals) => {
    const months = Object.keys(monthlyTotals);
    const earnings = Object.values(monthlyTotals);

    return {
      labels: months,
      datasets: [
        {
          label: "Monthly Earnings",
          data: earnings,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  };
  useEffect(() => {
    getTransactions();

    // Create the Chart instance
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      // Destroy the previous Chart instance, if it exists
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      const monthlyTotals = calculateMonthlyTotals();
      const chartData = formatChartData(monthlyTotals);

      // Create a new Chart instance
      chartRef.current.chart = new Chart(ctx, {
        type: "bar",
        data: chartData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [transactions]);

  return (
    <div>
      <Typography variant="h6">Total Earnings per Month</Typography>
      <canvas ref={chartRef} />
    </div>
  );
};

export default EarningsperMonth;