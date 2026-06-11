const express = require("express");

const router = express.Router();

const authenticateToken =
require("../middleware/authMiddleware");

const {
  createPool,
  getAllPools,
  joinPool,
  leavePool,
  getPoolMembers,
  completePool
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
router.post(
  "/complete/:id",
  authenticateToken,
  completePool
);
module.exports = router;