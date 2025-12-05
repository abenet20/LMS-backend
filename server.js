const express = require("express");
const app = express();
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const studentRoute = require("./routes/studentRoute");
const adminRoute = require("./routes/adminRoute");

app.use(
  cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/student", studentRoute);
app.use("/api/admin", adminRoute);
app.listen(5000, "0.0.0.0", () =>
  console.log("server is running on port 5000")
);