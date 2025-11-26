import React, { useRef, useState } from "react";
import "./ImageGenerator.css";
import default_image from "./assets/Image.png";

const ImageGenerator = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const imageGenerator = async () => {
    const prompt = inputRef.current.value.trim();
    if (!prompt) return;

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      console.log("Backend Response:", data);

      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
      } else {
        alert("No image generated. Try another prompt.");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="ai-image-generator">
      <div className="header">
        Image<span>Generator</span>
      </div>

      <div className="image">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <img src={imageUrl || default_image} alt="Generated" />
        )}
      </div>

      <div className="search-box">
        <input
          type="text"
          ref={inputRef}
          className="search-input"
          placeholder="Enter your prompt"
          onKeyDown={(e) => e.key === "Enter" && imageGenerator()}
        />

        <div
          className={`generate-btn ${loading ? "disabled" : ""}`}
          onClick={!loading ? imageGenerator : null}
        >
          {loading ? "Loading..." : "Generate"}
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
