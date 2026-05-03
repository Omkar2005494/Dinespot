const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = 3000;

// Serve frontend
app.use(express.static("public"));

// Home check
app.get("/", (req, res) => {
  res.send("Server is working ✅");
});

// Search route
app.get("/search", async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.json({ error: "City is required" });
  }

  try {
    // Step 1: Get coordinates using Geocoding API
    const geoRes = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address: city,
          key: process.env.API_KEY,
        },
      }
    );

    const location = geoRes.data.results[0].geometry.location;

    // Step 2: Get restaurants using Places API
    const placesRes = await axios.get(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
      {
        params: {
          location: `${location.lat},${location.lng}`,
          radius: 3000,
          type: "restaurant",
          key: process.env.API_KEY,
        },
      }
    );

    res.json({
      city,
      results: placesRes.data.results.slice(0, 12),
    });

  } catch (error) {
    console.error(error);
    res.json({ error: "Something went wrong" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});