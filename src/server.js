const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Accept JSON body

// 🔥 Your OpenAI API key directly here
const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY_HERE";

// AI Image Generator Endpoint
app.post("/api/generate-image", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        model: "gpt-image-1",
        prompt: prompt,
        size: "1024x1024",
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const imageUrl = response.data.data[0].url;

    return res.json({ imageUrl });
  } catch (error) {
    console.error("OpenAI API Error:", error.response?.data || error);
    return res.status(500).json({ error: "Failed to generate image" });
  }
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
