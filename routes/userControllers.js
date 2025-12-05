const express = require("express");
const router = express.Router();
const signup = require("../controllers/user/signup");

router.post("/signup", signup);