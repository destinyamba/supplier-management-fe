import axios from "axios";
import { decodeToken } from "./userManagementService";
import { ICreateWorkOrder, IWorkOrder, WOPagedResponse } from "@/types";

const API_BASE_URL = "http://localhost:6060/api/v1/work-order";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
};

const token = getToken();
if (!token) {
  throw new Error("No token found");
}

export const clientWorkOrders = async (
  page: number
): Promise<WOPagedResponse<IWorkOrder>> => {
  const decodedToken = decodeToken(token);
  if (!decodedToken || !decodedToken.sub) {
    throw new Error("Invalid token");
  }

  const orgId = decodedToken.orgId;
  const response = axios.get(`${API_BASE_URL}/client/${orgId}?pageNum=${page}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
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
