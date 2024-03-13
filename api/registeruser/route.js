const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  if (!req.body.fullName || !req.body.email || !req.body.password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const { fullName, email, password } = req.body;

  try {
    const existingUser = await prisma.user_information.findUnique({
      where: {
        Email: email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Proceed with creating the new user
    await prisma.user_information.create({
      data: {
        Full_Name: fullName,
        Email: email,
        Password: hashedPassword,
        Id: uuidv4(),
      },
    });

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
