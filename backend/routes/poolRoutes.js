const express = require("express");

const router = express.Router();

const authenticateToken =
require("../middleware/authMiddleware");

const {
  createPool
} = require("../controllers/poolController");

router.post(
  "/create",
  authenticateToken,
  createPool
);

module.exports = router;