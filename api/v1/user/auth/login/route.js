const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { generateToken } = require("../../utils/auth");
const { login } = require("../controller");

const prisma = new PrismaClient();

router.post("/", login);

module.exports = router;
