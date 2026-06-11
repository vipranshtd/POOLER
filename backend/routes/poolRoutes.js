const express = require("express");

const router = express.Router();

const authenticateToken =
require("../middleware/authMiddleware");

const {
  createPool,
  getAllPools,
  joinPool,
  leavePool,
  getPoolMembers
} = require("../controllers/poolController");

router.get("/", getAllPools);

router.post(
  "/create",
  authenticateToken,
  createPool
);
router.get(
  "/:id/members",
  getPoolMembers
);
router.post(
  "/join/:id",
  authenticateToken,
  joinPool
);
router.post(
  "/leave/:id",
  authenticateToken,
  leavePool
);
module.exports = router;