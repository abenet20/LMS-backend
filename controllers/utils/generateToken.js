const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwt_secret = process.env.jwt_secret;

const generateToken = (payload, expiresIn = "72h") => {
  return jwt.sign(payload, jwt_secret, { expiresIn });
};

module.exports = generateToken;
