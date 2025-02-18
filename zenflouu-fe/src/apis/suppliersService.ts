import axios from "axios";

const API_BASE_URL = "http://localhost:6060/api/v1/supplier";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
};
export const getAllSuppliers = async () => {
  const token = getToken();
  return axios.get(`${API_BASE_URL}/all`, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
};
