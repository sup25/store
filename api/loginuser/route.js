const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { generateToken } = require("../../utils/auth");

const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user_information.findFirst({
      where: {
        Email: email,
        Password: password,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const response = {
      message: "Login successful",
      token: generateToken({ userId: user.id }),
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
