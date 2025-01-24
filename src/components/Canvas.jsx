import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { useLocation } from "react-router-dom";

const Canvas = () => {
  const { state } = useLocation(); // Get the image URL from the passed state
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  // Initialize the canvas
  useEffect(() => {
    const initCanvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: "white",
    });
    setCanvas(initCanvas);

    // Load the selected image onto the canvas if it exists
    if (state && state.imageUrl) {
      FabricImage.fromURL(state.imageUrl, (img) => {
        img.set({
          left: 50,
          top: 50,
          angle: 0,
        });
        initCanvas.add(img); // Add image to canvas
        initCanvas.renderAll();
      });
    }

    return () => initCanvas.dispose();
  }, [state]);

  // Function to add text to the canvas
  const addText = () => {
    if (canvas) {
      const text = new fabric.Textbox("Your Text Here", {
        left: 50,
        top: 50,
        width: 200,
        fontSize: 20,
      });
      canvas.add(text);
    }
  };

  return (
    <div>
      <h1>Canvas Editor</h1>
      <button onClick={addText}>Add Text</button>
      <canvas ref={canvasRef} id="canvas"></canvas>
    </div>
  );
};

export default Canvas;
