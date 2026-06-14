const express = require("express");

const router = express.Router();

const authenticateToken =
require("../middleware/authMiddleware");

const {
  lateCancel,
  noShow
} = require("../controllers/trustController");

router.post(
  "/late-cancel",
  authenticateToken,
  lateCancel
);

router.post(
  "/no-show",
  authenticateToken,
  noShow
);

module.exports = router;