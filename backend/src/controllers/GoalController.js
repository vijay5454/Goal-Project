const asyncHandler = require("express-async-handler");
const {
  GetGoal,
  UpdateGoal,
  DeleteGoal,
  SaveGoal,
} = require("../services/GoalService");

// @desc GET goals
// @Route GET /api/goals
// @access private
const getGoals = asyncHandler(async (req, res, next) => {
  const value = req.user.id;
  const result = await GetGoal(value);
  res.status(200).json(result);
});

// @desc POST goals
// @Route POST /api/goals
// @access private
const createGoals = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { goalType, definition } = req.body;
  const result = await SaveGoal(userId, goalType, definition);
  res.status(200).json(result);
});

// @desc DELETE goals
// @Route DELETE /api/goals
// @access private
const deleteGoals = asyncHandler(async (req, res) => {
  const goalId = req.params.id;
  const userId = req.user.id;
  const result = await DeleteGoal(goalId, userId);
  res.status(200).json(result);
});

// @desc UPDATE goals
// @Route UPDATE /api/goals
// @access private
const updateGoals = asyncHandler(async (req, res, next) => {
  const goalId = req.params.id;
  const payload = req.body;
  const userId = req.user.id;
  const result = await UpdateGoal(goalId, payload, userId);
  res.status(200).json(result);
});

module.exports = {
  getGoals,
  createGoals,
  deleteGoals,
  updateGoals,
};
