const express = require("express");

const router = express.Router();

const authenticateToken =
require("../middleware/authMiddleware");

const {
  getProfile,
  getTrustHistory,
  getUserStats
} = require("../controllers/userController");

router.get(
  "/profile",
  authenticateToken,
  getProfile
);

router.get(
  "/trust-history",
  authenticateToken,
  getTrustHistory
);

router.get(
  "/stats",
  authenticateToken,
  getUserStats
);

module.exports = router;