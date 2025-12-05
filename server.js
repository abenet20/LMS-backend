const express = require("express");
const app = express();
const cors = require("cors");
const userControllers = require("./routes/userControllers");

app.use(
  cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/user", userControllers);
app.listen(5000, "0.0.0.0", () =>
  console.log("server is running on port 5000")
);