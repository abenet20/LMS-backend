const database = require("../../controllers/data/database");
const { mail } = require("../../controllers/sender/mail");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await database.query("INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)", [name, email, hashedPassword]);
  mail(email, "Successful signup", "You have been successfully signed up to the LMS. You can now login and take your courses");
 const token = generateToken({ id: user.id });
  res.status(201).json({ success: true, message: "User created successfully", user, token  });
};

module.exports = {signup};