import axios from "axios";
// import { decodeToken } from "./userManagementService";
import { ICreateWorkOrder, IWorkOrder, WOPagedResponse } from "@/types";

const API_BASE_URL = "http://localhost:6060/api/v1/work-order";

export const getToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const token = localStorage.getItem("authToken");

  if (!token) {
    console.warn("No token found. Redirecting to login.");
    return null;
  }

  return token;
};

const decodeToken = (token: any) => {
  try {
    const base64Url = token.split(".")[1]; // Get the payload
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
const token = getToken();
export const clientWorkOrders = async (
  page: number
): Promise<WOPagedResponse<IWorkOrder>> => {
  const decodedToken = decodeToken(token);
  if (!decodedToken || !decodedToken.sub) {
    throw new Error("Invalid token");
  }

  const orgId = decodedToken.orgId;
  const response = axios.get(
    `${API_BASE_URL}/client/${orgId}?pageNum=${page}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    }
  );
  return (await response).data;
};

export const createWorkOrder = async (
  workOrder: Omit<ICreateWorkOrder, "id">
): Promise<ICreateWorkOrder> => {
  const decodedToken = decodeToken(token);
  const clientId = decodedToken.orgId;
  const projectManager = decodedToken.sub;
  const response = await axios.post(
    `${API_BASE_URL}`,
    { ...workOrder, clientId, projectManager },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    }
  );
  return response.data;
};

export const listOfLocations = async () => {
  return axios.get(`${API_BASE_URL}/locations`, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
};

export const getWorkOrder = async (id: string): Promise<IWorkOrder> => {
  const token = getToken();
  const response = axios.get(`${API_BASE_URL}/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  return (await response).data;
};

export const cancelWorkOrder = async (id: string): Promise<IWorkOrder> => {
  const token = getToken();
  const orgId = decodeToken(token).orgId;
  const response = axios.delete(`${API_BASE_URL}/delete/${orgId}/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  return (await response).data;
}
