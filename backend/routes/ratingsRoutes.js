const express = require("express");

const router = express.Router();

const authenticateToken =
require("../middleware/authMiddleware");

const {
  submitRating
} = require("../controllers/ratingsController");

router.post(
  "/",
  authenticateToken,
  submitRating
);

module.exports = router;