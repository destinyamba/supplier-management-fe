import axios from "axios";
import { decodeToken } from "./userManagementService";

const API_BASE_URL = "http://localhost:6060/api/v1/client";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
};

export const onboardClient = async (clientData: any) => {
  const token = getToken();
  try {
    const response = await axios.post(`${API_BASE_URL}/onboard`, clientData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Return the error response from the backend
      return Promise.reject(error.response.data);
    } else {
      // Handle other errors
      return Promise.reject({ message: "An unexpected error occurred" });
    }
  }
};

export const addSupplierToList = async (
  supplierId: string,
  contractType: string
) => {
  const token = getToken();
  const clientId = decodeToken(token).orgId;
  try {
    const response = await axios.post(
      `${API_BASE_URL}/approve/supplier?clientId=${clientId}&supplierId=${supplierId}&contractType=${contractType}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject({ message: "An unexpected error occurred" });
    }
  }
};

export const getClientSuppliers = async (pagNum: number) => {
  const token = getToken();
  const clientId = decodeToken(token).orgId;
  return axios.get(`${API_BASE_URL}/${clientId}/suppliers?${pagNum}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
};
