const database = require("../../controllers/data/database");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await database.query("SELECT * FROM users WHERE email = ?", [email]);
    if (!rows || rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken({ id: user.id });
    // omit sensitive fields
    const safeUser = { id: user.id, email: user.email, name: user.name, role: user.role };
    res.status(200).json({ success: true, token, user: safeUser });
  } catch (error) {
    // handle DB connectivity issues separately
    if (error && error.code === 'ETIMEDOUT') {
      return res.status(503).json({ success: false, message: 'Database connection timed out' });
    }
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = {login};