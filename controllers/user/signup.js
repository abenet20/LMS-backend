const database = require("../../controllers/data/database");
const { send } = require("../../controllers/sender/sms");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await database.query("INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)", [name, email, hashedPassword]);
  res.status(201).json({ message: "User created successfully" });
};

module.exports = {signup};