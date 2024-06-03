"use client"
import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import styles from "../page.module.css";
import Navbar from '../navbar.js';
import Footer from '../footer.js';
import Link from 'next/link';

const fetchStockData = async (symbol) => {
  const apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;
  const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;
  const response = await fetch(apiUrl, {cache: 'no-store'});
  const data = await response.json();
  console.log(data);
  return data;
};

const transformData = (data) => {
  const timeSeries = data["Time Series (Daily)"];
  const dates = Object.keys(timeSeries).slice(0, 30).reverse();
  const prices = dates.map((date) => parseFloat(timeSeries[date]["4. close"]));
  return { dates, prices };
};

const getStockInfo = (stockData) => {
  const lastDate = stockData.dates[stockData.dates.length - 1];
  const currentPrice = stockData.prices[stockData.prices.length - 1];
  const minPrice = Math.min(...stockData.prices);
  const maxPrice = Math.max(...stockData.prices);
  return { lastDate, currentPrice, minPrice, maxPrice };
};

const StockChart = ({ symbol, stockData }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [stockInfo, setStockInfo] = useState(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: stockData.dates,
        datasets: [
          {
            label: `${symbol} Stock Price`,
            data: stockData.prices,
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: "Date",
              color: "white"
            },
            ticks: {
              color: "white",
            },
            grid: {
              color: "rgba(255, 255, 255, 0.2)",
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: "Price (USD)",
              color: "white"
            },
            ticks: {
              color: "white",
            },
            grid: {
              color: "rgba(255, 255, 255, 0.2)",
            },
          },
        },
      },
    });

    setStockInfo(getStockInfo(stockData));
  }, [stockData]);

  return (
    <>
      <canvas ref={chartRef} style={{padding: '3%'}}></canvas>
      {stockInfo && (
        <div className={styles.stockInfo} style={{padding: '3%', color: 'white'}}>
          <p><strong>Latest Date:</strong> {stockInfo.lastDate}</p>
          <p><strong>Current Price:</strong> ${stockInfo.currentPrice}</p>
          <p><strong>Minimum Price:</strong> ${stockInfo.minPrice}</p>
          <p><strong>Maximum Price:</strong> ${stockInfo.maxPrice}</p>
        </div>
      )}
    </>
  );
};

export default function Stock() {
  const [stocks, setStocks] = useState({
    AAPL: { dates: [], prices: [] },
    GOOGL: { dates: [], prices: [] },
    MSFT: { dates: [], prices: [] },
  });
  const [selectedStock, setSelectedStock] = useState("AAPL"); // Default selected stock

  useEffect(() => {
    const fetchAllStockData = async () => {
      const symbols = ["AAPL", "GOOGL", "MSFT"];
      const stockData = {};

      for (const symbol of symbols) {
        const data = await fetchStockData(symbol);
        stockData[symbol] = transformData(data);
      }

      setStocks(stockData);
    };

    fetchAllStockData();
  }, []);

  const handleStockToggle = (symbol) => {
    setSelectedStock(symbol);
  };

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "20vh" }}></div>
      <div className={styles.weatherHead}>
        <h1>Stocks!</h1>
        <br />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', paddingBottom: '50px' }}>
        <button onClick={() => handleStockToggle("AAPL")}>Apple</button>
        <button onClick={() => handleStockToggle("GOOGL")}>Google</button>
        <button onClick={() => handleStockToggle("MSFT")}>Microsoft</button>
      </div>
      {Object.keys(stocks).map((symbol) => (
        <div key={symbol} style={{ display: selectedStock === symbol ? "block" : "none", padding: '3%' }}>
          <h2 style={{ textAlign: 'center', color: 'white' }}>{symbol}</h2>
          <StockChart symbol={symbol} stockData={stocks[symbol]} />
        </div>
      ))}
      <Link href="/">
        <h3 style={{ textAlign: "center", paddingBottom: "30px", textDecoration: "underline", color: "#898989" }}>Back to home</h3>
      </Link>
      <Footer />
    </>
  );
}
