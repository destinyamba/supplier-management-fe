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

export const signin = async (
  userData: { email: string; password: string },
  setToken: (token: { businessType: string } | null) => void
) => {
  const response = await axios.post(`${API_BASE_URL}/signin`, userData);
  const authToken = response.data.token;
  localStorage.setItem("authToken", JSON.stringify(authToken));

  try {
    const decodedToken = JSON.parse(atob(authToken.split(".")[1]));
    setToken({ businessType: decodedToken.businessType });
  } catch (error) {
    console.error("Error decoding auth token:", error);
  }

  return response;
};

export const passwordReset = (userData: {
  email: string;
  newPassword?: string;
  token?: string;
}) => {
  return axios.post(`${API_BASE_URL}/password-reset`, userData);
};
