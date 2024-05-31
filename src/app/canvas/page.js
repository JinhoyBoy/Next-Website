"use client";
import React, { useState } from 'react';
import styles from "../page.module.css";
import Navbar from '../navbar.js';
import Footer from '../footer.js';
import DrawingCanvas from "./drawingCanvas";
import Link from 'next/link';

export default function Canvas() {
  const [isCanvasVisible, setIsCanvasVisible] = useState(false);
  const [clearCanvas, setClearCanvas] = useState(false);
  const [drawingImageUrl, setDrawingImageUrl] = useState('');

  const toggleCanvas = () => {
    setIsCanvasVisible(!isCanvasVisible);
    setClearCanvas(!isCanvasVisible); // Clear canvas when opening, not when closing
  };

  const handleDrawingSaved = (imageUrl) => {
    setDrawingImageUrl(imageUrl);
    toggleCanvas(); // Close the canvas after saving
  };

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "20vh" }}></div>
      <div className={styles.weatherHead}>
        <h1>Canvas!</h1>
        <br />
        <button onClick={toggleCanvas} style={{ marginRight: '10px' }}>{isCanvasVisible ? 'Close Canvas' : 'Open Canvas'}</button>
      </div>
      <div className={styles.canvas}>
        {isCanvasVisible && <DrawingCanvas clear={clearCanvas} onClose={handleDrawingSaved} />}
      </div>
      <div className={styles.weatherHead}>
        <h3>Your signature:</h3>
        {drawingImageUrl && <img src={drawingImageUrl} alt='Drawing' />}
      </div>
      <Link href="/">
        <h3 style={{ textAlign: "center", paddingBottom: "30px", textDecoration: "underline", color: "#898989" }}>Back to home</h3>
      </Link>
      <Footer/>
    </>
  );
}