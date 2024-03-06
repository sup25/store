const express = require("express");

const pool = require("../config/dbConfig");

const app = express();

// Test database connection when the server starts
async function testDbConnection() {
  try {
    const query = 'SELECT * FROM users."user information"';

    // Execute the query using the connection pool
    const result = await pool.query(query);

    console.log("Successfully connected to the database:", result.rows[0]);
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  } finally {
    // Close the database connection pool
    await pool.end();
  }
}

// Start the server and test the database connection
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  testDbConnection();
});
