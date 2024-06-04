//Seite für das HTML-Canvas Unterschrift Credit
"use client";
import React, { useState } from 'react';
import styles from "../page.module.css";
import Navbar from '../navbar.js';
import Footer from '../footer.js';
import DrawingCanvas from "./drawingCanvas";
import Link from 'next/link';

// Canvas Komponente
export default function Canvas() {
  const [isCanvasVisible, setIsCanvasVisible] = useState(false);
  const [clearCanvas, setClearCanvas] = useState(false);
  const [drawingImageUrl, setDrawingImageUrl] = useState('');
  // Funktion zum Anzeigen/Verstecken des Canvas
  const toggleCanvas = () => {
    setIsCanvasVisible(!isCanvasVisible);
    setClearCanvas(!isCanvasVisible);
  };
  // Funktion zum Speichern der Unterschrift
  const handleDrawingSaved = (imageUrl) => {
    setDrawingImageUrl(imageUrl);
    toggleCanvas();
  };

  return (
    // HTML-Struktur für die Canvas-Seite
    <>
      <Navbar />
      <div style={{ paddingTop: "20vh" }}>
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
        <div style={{height: '30vh'}}>{drawingImageUrl && <img src={drawingImageUrl} alt='Drawing'/>}</div>
      </div>
      <Link href="/">
        <h3 style={{ textAlign: "center", paddingBottom: "30px", textDecoration: "underline", color: "#898989" }}>Back to home</h3>
      </Link>
      <Footer/>
      </div>
    </>
  );
}