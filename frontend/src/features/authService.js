import axios from "axios";

const API_URL_REGISTER = "https://goal-backend.onrender.com/api/users/";
const API_URL_LOGIN = "https://goal-backend.onrender.com/api/users/login/";

const register = async (userData) => {
  const response = await axios.post(API_URL_REGISTER, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const login = async (loginData) => {
  const response = await axios.post(API_URL_LOGIN, loginData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const authService = {
  register,
  login,
};

export default authService;
