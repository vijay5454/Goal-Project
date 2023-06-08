import axios from "axios";

const GOALS_GET_URL = "https://goal-backend.onrender.com/api/goals/";

//Get Goals
const getGoals = async (token) => {
  const response = await axios.get(GOALS_GET_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);
  return response;
};

//Create Goal
const createGoals = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer: ${token}`,
    },
  };
  const response = await axios.post(GOALS_GET_URL, goalData, config);

  return response.data;
};

const goalService = {
  getGoals,
  createGoals,
};

export default goalService;
