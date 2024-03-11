const express = require("express");
const router = express.Router();
const pool = require("../../config/dbConfig");

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const query = `
      SELECT *
      FROM users."user information"
      WHERE "Email" = $1 AND "Password" = $2
    `;
    const result = await pool.query(query, [email, password]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = result.rows[0];
    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error logging in:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
