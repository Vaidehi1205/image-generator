const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/api/search", async (req, res) => {
  const query = req.query.q;
  try {
    const response = await axios.get(
      `https://lexica.art/api/v1/search?q=${encodeURIComponent(query)}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Lexica API failed." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
