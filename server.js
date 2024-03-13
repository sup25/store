const express = require("express");
const cors = require("cors");
const app = express();
const loginRoute = require("./api/loginuser/route.js");
const registerRoute = require("./api/registeruser/route.js");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

//routes
app.use("/loginuser", loginRoute);
app.use("/registeruser", registerRoute);

async function DbConnection() {
  try {
    const result =
      await prisma.$queryRaw`SELECT current_database() as db_name;`;
    const databaseName = result[0].db_name;
    console.log("Successfully connected to the database:", databaseName);
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
}

// Start the server and test the database connection
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  DbConnection();
});
