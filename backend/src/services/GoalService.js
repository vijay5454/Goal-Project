const Goal = require("../models/Goals/GoalModel");

const GetGoal = async (value) => {
  const results = await Goal.find({ user: value });
  if (!results) {
    throw new Error("No Results found");
  } else {
    return results;
  }
};

const SaveGoal = async (userId, goalType, definition) => {
  if (!goalType || !definition) {
    throw new Error("Please add missing field!");
  }
  const result = Goal.create({
    user: userId,
    goalType,
    definition,
  });
  return result;
};

const UpdateGoal = async (id, payload, userId) => {
  console.log(id);
  const goal = await Goal.findById(id);
  //Checking for given Goal id
  if (!goal) {
    throw new Error(`Result not found for given ${id}`);
  }
  //Checking for given Used id obtained from token
  if (!userId) {
    throw new Error("Not Authorized");
  }
  //Checking for used id equals to userid which is present in Goal document
  if (goal.user.toString() !== userId) {
    throw new Error("User not Authorized!");
  }
  const result = await Goal.findByIdAndUpdate(id, payload, { insert: true });
  return result;
};

const DeleteGoal = async (goalId, userId) => {
  const goal = await Goal.findById(goalId);
  if (!goal) {
    throw new Error("Goal not found!");
  }
  if (goal.user.toString() !== userId) {
    throw new Error("Not Authorized!");
  }
  const result = Goal.findByIdAndDelete(goalId);
  return result;
};

module.exports = {
  GetGoal,
  SaveGoal,
  UpdateGoal,
  DeleteGoal,
};
