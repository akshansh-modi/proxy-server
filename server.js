// import express from 'express';
// import fetch from 'node-fetch';

// const app = express();
// const PORT = 3000;

// app.use(express.json());

// app.get('/api/nearby', async (req, res) => {
//     const apiUrl = 'https://atlas.mappls.com/api/places/nearby/json?keywords=cng&radius=10000&refLocation=26.9167%2C75.8167';
//     const token = 'dc7471c9-856c-4086-ae15-67fb4cc4e1f4';

//     try {
//         const response = await fetch(apiUrl, {
//             method: 'GET',
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });

//         if (!response.ok) {
//             return res.status(response.status).json({ error: 'Failed to fetch data from API' });
//         }

//         const data = await response.json();
//         res.json(data);
//     } catch (error) {
//         console.error('Error fetching API:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Proxy server running at http://localhost:${PORT}`);
// });
import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = 3000;

app.use(express.json());

// Proxy route to accept query parameters
app.get("/api/nearby", async (req, res) => {
  const { keywords, radius, refLocation } = req.query;

  // Validate query parameters
  if (!keywords || !radius || !refLocation) {
    return res
      .status(400)
      .json({
        error:
          "Missing required query parameters: keywords, radius, refLocation",
      });
  }

  const apiUrl = `https://atlas.mappls.com/api/places/nearby/json?keywords=${encodeURIComponent(
    keywords
  )}&radius=${encodeURIComponent(radius)}&refLocation=${encodeURIComponent(
    refLocation
  )}`;
  const token = "dc7471c9-856c-4086-ae15-67fb4cc4e1f4";

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch data from API" });
    }

    const data = await response.json();
    res.json(data); // Send the fetched data back to the client
  } catch (error) {
    console.error("Error fetching API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
