const express = require("express");
const router = express.Router();
const pool = require("../../config/dbConfig");
const { v4: uuidv4 } = require("uuid");

router.post("/", async (req, res) => {
  if (!req.body.fullName || !req.body.email || !req.body.password) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  console.log(req.body);
  const { fullName, email, password } = req.body;
  const userId = uuidv4();

  try {
    const query = `
      INSERT INTO users."user information" ("Full Name", "Email", "Password", "Id")
      VALUES ($1, $2, $3, $4)
    `;
    await pool.query(query, [fullName, email, password, userId]);
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
