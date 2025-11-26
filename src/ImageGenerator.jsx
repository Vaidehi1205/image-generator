import React, { useRef, useState } from "react";
import "./ImageGenerator.css";
import default_image from "./assets/Image.png"; // Optional fallback

const API_KEY = ""; // 🔒 Replace with your actual API key

const ImageGenerator = () => {
  const [imageUrl, setImageUrl] = useState("/");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const imageGenerator = async () => {
    const prompt = inputRef.current.value.trim();
    if (!prompt) return;

    setLoading(true);

    try {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(
          prompt
        )}&per_page=10`,
        {
          headers: {
            Authorization: API_KEY,
          },
        }
      );

      const data = await response.json();
      console.log(data);

      if (data.photos && data.photos.length > 0) {
        const randomPhoto =
          data.photos[Math.floor(Math.random() * data.photos.length)];
        setImageUrl(randomPhoto.src.large);
      } else {
        alert("No images found for this prompt.");
      }
    } catch (error) {
      console.error("Error fetching image from Pexels:", error);
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
          <img
            src={imageUrl === "/" ? default_image : imageUrl}
            alt="Generated"
          />
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
        <div className="generate-btn" onClick={imageGenerator}>
          Generate
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
