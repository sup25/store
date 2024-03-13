const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const { generateToken } = require("../../utils/auth");

const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user_information.findFirst({
      where: {
        Email: email,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.Password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Passwords match, generate JWT token
    const token = generateToken({ userId: user.id });

    const response = {
      message: "Login successful",
      token: token,
      fullName: user.Full_Name,
      email: user.Email,
    };

    // Send token in response
    return res.status(200).json({ message: "Login successful", response });
  } catch (error) {
    console.error("Error logging in:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
