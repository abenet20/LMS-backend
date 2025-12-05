const jwt = require("jsonwebtoken");
const jwt_secret = "0000-0000-0000-0000";

const generateToken = (payload, expiresIn = "1h") => {
  return jwt.sign(payload, jwt_secret, { expiresIn });
};

module.exports = generateToken;