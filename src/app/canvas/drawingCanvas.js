import React, { useRef, useEffect, useState } from 'react';

const DrawingCanvas = ({ onClose }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const canvas = canvasRef.current;
    const resizeCanvas = () => {
      canvas.width = window.innerWidth * 0.4;
      canvas.height = window.innerHeight * 0.3;
      if (window.innerWidth < 500) {
        canvas.height = window.innerHeight * 0.1;
      }
    };
    resizeCanvas();

    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
    setContext(ctx);

    // Handle window resize
    window.addEventListener('resize', resizeCanvas);

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const getPosition = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (e) => {
    if (!context) return;

    e.preventDefault();
    setIsDrawing(true);
    const { x, y } = getPosition(e);
    context.beginPath();
    context.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing || !context) return;

    e.preventDefault();
    const { x, y } = getPosition(e);
    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    if (!context) return;

    setIsDrawing(false);
    context.closePath();
  };

  const clearCanvas = () => {
    if (!context) return;
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const saveCanvas = () => {
    if (!canvasRef.current || !context) return;

    const dataUrl = canvasRef.current.toDataURL();
    setImageUrl(dataUrl);
    onClose(dataUrl); // Pass the image URL to the parent component
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{border: '3px solid gray', borderRadius: '10px', display: 'block', backgroundColor: 'white', touchAction: 'none' }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
        <button onClick={clearCanvas}>Clear</button>
        <button onClick={saveCanvas}>Save</button>
      </div>
      {imageUrl && <img src={imageUrl} alt="Drawing" />}
    </div>
  );
};

export default DrawingCanvas;




