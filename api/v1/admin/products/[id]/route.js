const express = require("express");
const { getProductById } = require("../controller");

const router = express.Router();

// GET /api/v1/admin/products/:id
router.get("/", getProductById);
