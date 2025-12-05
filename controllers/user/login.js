const database = require("../../controllers/data/database");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await database.query("SELECT * FROM users WHERE email = ?", [email]);
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const token = generateToken({ id: user.id });
  res.status(200).json({ success: true, token, user });
};

module.exports = login;