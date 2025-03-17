import axios from "axios";

const API_BASE_URL = "http://localhost:6060/api/v1/auth";

export const signup = async (userData: {
  email: string;
  password: string;
  name: string;
  businessType: string;
}) => {
  const response = await axios.post(`${API_BASE_URL}/signup`, userData);
  localStorage.setItem("authToken", response.data.token);
  return response;
};

export const signin = async (userData: { email: string; password: string }) => {
  const response = await axios.post(`${API_BASE_URL}/signin`, userData);
  localStorage.setItem("authToken", response.data.token);
  document.cookie = `authToken=${response.data.token}; path=/; max-age=3600`;
  return response;
};

export const passwordReset = (userData: {
  email: string;
  newPassword?: string;
  token?: string;
}) => {
  return axios.post(`${API_BASE_URL}/password-reset`, userData);
};
