import { useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import * as fabric from "fabric";

const Canvas = () => {
  const canvasRef = useRef(null); 
  const fabricCanvasRef = useRef(null); 
  const [searchParams] = useSearchParams();
  const imgUrl = searchParams.get("img");

  useEffect(() => {
    
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 400,
      height: 350,
      backgroundColor: "white",
    });
    fabricCanvasRef.current = canvas; 

    const imgDisplay = document.createElement("img");
    imgDisplay.src = imgUrl;
   imgDisplay.crossOrigin = "anonymous"; 

    imgDisplay.onload = () => {
      const img = new fabric.Image(imgDisplay);
      img.set({
        left: canvas.width / 2 - img.width / 2,
        top: canvas.height / 2 - img.height / 2,
        scaleX: 200 / img.width, 
        scaleY: 200 / img.height, 
      });

      canvas.add(img);
      canvas.centerObject(img);
      canvas.setActiveObject(img);
      canvas.renderAll();
    };

    return () => {
      canvas.dispose();
    };
  }, [imgUrl]);


  const addText = () => {
    const canvas = fabricCanvasRef.current; 
    if (canvas) {
      const text = new fabric.Textbox("Your Text Here", {
        left: 100,
        top: 100,
        width: 300,
        fontSize: 20,
        fill: "black",
      });
      canvas.add(text);
      canvas.setActiveObject(text); 
      canvas.renderAll();
    }
  };

  const downloadCanvas = () => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL({
        format: "png",
        quality: 1.0, 
      });
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "canvas-image.png"; 
      link.click(); 
    }
  };

  return (
    <div>
      <h1>Canvas Editor</h1>
      <button onClick={addText} style={{ marginBottom: "10px" }}>
        Add Text
      </button>
      <button onClick={downloadCanvas} style={{ marginBottom: "10px" }}>
        Download Canvas
      </button>
      <canvas
        ref={canvasRef}
        id="canvas"
        style={{ border: "1px solid #ccc" }}
      ></canvas>

      <Link to={"/"}>Go back</Link>
    </div>
  );
};

export default Canvas;
