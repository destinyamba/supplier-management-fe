import axios from "axios";
import { decodeToken } from "./userManagementService";

const API_BASE_URL = "http://localhost:6060/api/v1/supplier";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
};
export const getAllSuppliers = async (page?: number) => {
  const token = getToken();
  return axios.get(`${API_BASE_URL}/all?pageNum=${page}`, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
};

export const getSupplierById = async () => {
  const token = getToken();
  const orgId = decodeToken(token).orgId;
  return axios.get(`${API_BASE_URL}/${orgId}`, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
};

export const nlpSearchSuppliers = async (
  query: string,
  pageNum: number,
  pageSize: number
) => {
  const token = getToken();
  return axios.get(
    `${API_BASE_URL}/nlp/search?query=${query}&pageNum=${pageNum}&pageSize=${pageSize}`,
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    }
  );
};

export const getASupplier = async (id: string) => {
  const token = getToken();
  const orgId = decodeToken(token).orgId;
  return axios.get(`${API_BASE_URL}/${id}`, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
};
