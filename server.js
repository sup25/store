const express = require("express");
const pool = require("./config/dbConfig");
const cors = require("cors");
const app = express();
const loginRoute = require("./api/loginuser/route.js");
const registerRoute = require("./api/registeruser/route.js");

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Mount the registerRoute under /registeruser path
app.use("/loginuser", loginRoute);
app.use("/registeruser", registerRoute);

// Test database connection when the server starts
async function testDbConnection() {
  try {
    const query = 'SELECT * FROM users."user information"';

    // Execute the query using the connection pool
    const result = await pool.query(query);

    console.log("Successfully connected to the database:", result.rows[0]);
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
}

// Start the server and test the database connection
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  testDbConnection();
});
