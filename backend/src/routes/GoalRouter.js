const express = require("express");
const router = express.Router();
const {
  getGoals,
  updateGoals,
  deleteGoals,
  createGoals,
} = require("../controllers/GoalController");
const { protectUserRoute } = require("../middlewares/authMiddleware");

router.get("/", protectUserRoute, getGoals);

router.post("/", protectUserRoute, createGoals);

router.delete("/:id", protectUserRoute, deleteGoals);

router.put("/:id", protectUserRoute, updateGoals);

module.exports = router;
