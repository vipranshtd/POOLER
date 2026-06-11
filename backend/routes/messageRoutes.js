const express = require("express");

const router = express.Router();

const authenticateToken =
require("../middleware/authMiddleware");

const {
  sendMessage,
  getMessages
} = require("../controllers/messageController");

router.post(
  "/send",
  authenticateToken,
  sendMessage
);

router.get(
  "/:poolId",
  getMessages
);

module.exports = router;