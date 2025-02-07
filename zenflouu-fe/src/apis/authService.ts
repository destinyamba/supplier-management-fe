import axios from "axios";

const API_BASE_URL = "http://localhost:6060/api/v1/auth";

export const signup = (userData: {
  email: string;
  password: string;
  name: string;
  businessType: string;
}) => {
  return axios.post(`${API_BASE_URL}/signup`, userData);
};

export const signin = (userData: { email: string; password: string }) => {
  return axios.post(`${API_BASE_URL}/signin`, userData);
};

export const passwordReset = (userData: {
  email: string;
  password?: string;
  token?: string;
}) => {
  return axios.post(`${API_BASE_URL}/password-reset`, userData);
};
