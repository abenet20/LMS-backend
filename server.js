const express = require("express");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

app.listen(5000, "0.0.0.0", () =>
  console.log("server is running on port 5000")
);