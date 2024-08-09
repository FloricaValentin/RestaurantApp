const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/restaurants", (req, res) => {
  const restaurants = [
    "Restaurant 1",
    "Restaurant 2",
    "Restaurant 3",
    "Restaurant 4",
    "Restaurant 5",
    "Restaurant 6",
    "Restaurant 7",
    "Restaurant 8",
    "Restaurant 9",
    "Restaurant 10",
  ];
  res.json(restaurants);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
