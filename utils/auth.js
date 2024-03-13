const jwt = require("jsonwebtoken");

// Secret key to sign JWT tokens
const secretKey = "secret";

// Function to generate JWT token
function generateToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}

// Function to verify JWT token
function verifyToken(token) {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null; // Token verification failed
  }
}

module.exports = { generateToken, verifyToken };
