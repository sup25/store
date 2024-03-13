const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  if (!req.body.fullName || !req.body.email || !req.body.password) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  console.log(req.body);
  const { fullName, email, password } = req.body;

  try {
    await prisma.user_Information.create({
      data: {
        Full_Name: fullName,
        Email: email,
        Password: password,
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
