"use client"
import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import styles from "../page.module.css";
import Navbar from '../navbar.js';
import Footer from '../footer.js';
import Link from 'next/link';

// Funktion für Aktiendaten fetchen
const fetchStockData = async (symbol) => {
  const apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;
  const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;
  const response = await fetch(apiUrl, {cache: 'no-store'});
  const data = await response.json();
  console.log(data);
  return data;
};
// Daten verarbeiten
const transformData = (data) => {
  if (!data["Time Series (Daily)"]) {
    return { dates: [], prices: [], error: 'Time Series data not found, probably because ALPHA VANTAGE only allows 25 calls per day... Please try again tomorrow.' };
  }
  const timeSeries = data["Time Series (Daily)"];
  const dates = Object.keys(timeSeries).slice(0, 30).reverse();
  const prices = dates.map((date) => parseFloat(timeSeries[date]["4. close"]));
  return { dates, prices };
};

// Aktieninfos
const getStockInfo = (stockData) => {
  const lastDate = stockData.dates[stockData.dates.length - 1];
  const currentPrice = stockData.prices[stockData.prices.length - 1];
  const minPrice = Math.min(...stockData.prices);
  const maxPrice = Math.max(...stockData.prices);
  return { lastDate, currentPrice, minPrice, maxPrice };
};

// Check if data is cached and if it is still valid
const getCachedData = (symbol) => {
  const cachedData = localStorage.getItem(`stockData_${symbol}`);
  if (cachedData) {
    const parsedData = JSON.parse(cachedData);
    const cachedTime = new Date(parsedData.timestamp);
    const currentTime = new Date();
    const threeHours = 10* 60* 1000;

    // Checken ob chachedData kürzer als 3 Stunden war
    if ((currentTime - cachedTime) < threeHours) {
      return parsedData.data;
    }
  }
  return null;
};

// Speichere Daten zu cache
const saveToCache = (symbol, data) => {
  const cachedData = {
    data,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem(`stockData_${symbol}`, JSON.stringify(cachedData));
};

// Kompnente für Aktienkurs
const StockChart = ({ symbol, stockData }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [stockInfo, setStockInfo] = useState(null);

  useEffect(() => {
    if (stockData.error) {
      setStockInfo(null);
      return;
    }

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
              color: "white"
            },
            ticks: {
              color: "white",
              callback: function(value, index) {
                const date = new Date(stockData.dates[index]);
                const month = date.toLocaleString('default', { month: 'short' });
                const day = date.getDate();
                return `${month} ${day}`;
              },
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
      {stockData.error ? (
        <div className={styles.error} style={{ color: 'orange', textAlign: 'center', padding: '5%'}}>
          <p>{stockData.error}</p>
        </div>
      ) : (
        <>
        <canvas ref={chartRef} style={{ padding: '3%' }}></canvas>
          {stockInfo && (
            <div className={styles.stockInfo} style={{color: 'lightgray', textAlign: "center", paddingBottom: "30px"}}>
              <p><strong>Latest Date:</strong> {stockInfo.lastDate}</p>
              <p><strong>Current Price:</strong> ${stockInfo.currentPrice}</p>
              <p><strong>Minimum Price:</strong> ${stockInfo.minPrice}</p>
              <p><strong>Maximum Price:</strong> ${stockInfo.maxPrice}</p>
            </div>
          )}
        </>
      )}
    </>
  );
};

// Haupt Komponente für Aktien Seite
export default function Stock() {
  const [stocks, setStocks] = useState({
    AAPL: { dates: [], prices: [] },
    GOOGL: { dates: [], prices: [] },
    MSFT: { dates: [], prices: [] },
  });
  const [selectedStock, setSelectedStock] = useState("AAPL"); // Default selected Aktie

  useEffect(() => {
    const fetchAllStockData = async () => {
      const symbols = ["AAPL", "GOOGL", "MSFT"];
      const stockData = {};

      for (const symbol of symbols) {
        let data = getCachedData(symbol);

        if (!data) {
          const fetchedData = await fetchStockData(symbol);
          data = transformData(fetchedData);
          saveToCache(symbol, data);
        }

        stockData[symbol] = data;
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
        <div key={symbol} style={{ display: selectedStock === symbol ? "block" : "none", padding: '3%'}}>
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
