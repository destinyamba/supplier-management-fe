import axios from "axios";
import { decodeToken } from "./userManagementService";

const API_BASE_URL = "http://localhost:6060/api/v1/metrics";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
};
const token = getToken();
const clientId = decodeToken(token).orgId;

export const getTotalSuppliers = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/total-suppliers?clientId=${clientId}`,
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
      // Return the error response from the backend
      return Promise.reject(error.response.data);
    } else {
      // Handle other errors
      return Promise.reject({ message: "An unexpected error occurred" });
    }
  }
};

export const getTotalWO = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/total-work-orders?clientId=${clientId}`,
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
      // Return the error response from the backend
      return Promise.reject(error.response.data);
    } else {
      // Handle other errors
      return Promise.reject({ message: "An unexpected error occurred" });
    }
  }
};

export const getTotalUpcomingWO = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/upcoming-work-orders?clientId=${clientId}`,
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
      // Return the error response from the backend
      return Promise.reject(error.response.data);
    } else {
      // Handle other errors
      return Promise.reject({ message: "An unexpected error occurred" });
    }
  }
};

export const getSupplierRequirementStatusCount = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/requirement-status?clientId=${clientId}`,
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
      // Return the error response from the backend
      return Promise.reject(error.response.data);
    } else {
      // Handle other errors
      return Promise.reject({ message: "An unexpected error occurred" });
    }
  }
};

export const getSupplierWorkStatusCount = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/work-status?clientId=${clientId}`,
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
      // Return the error response from the backend
      return Promise.reject(error.response.data);
    } else {
      // Handle other errors
      return Promise.reject({ message: "An unexpected error occurred" });
    }
  }
};

export const getSupplierContractTypeCount = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/contract-type?clientId=${clientId}`,
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
      // Return the error response from the backend
      return Promise.reject(error.response.data);
    } else {
      // Handle other errors
      return Promise.reject({ message: "An unexpected error occurred" });
    }
  }
};

export const getWOStatusCount = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/work-order-status?clientId=${clientId}`,
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
      // Return the error response from the backend
      return Promise.reject(error.response.data);
    } else {
      // Handle other errors
      return Promise.reject({ message: "An unexpected error occurred" });
    }
  }
};

export const getClientSuppliersOnboardedOverTime = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/suppliers-onboarded-over-time?clientId=${clientId}`,
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
      // Return the error response from the backend
      return Promise.reject(error.response.data);
    } else {
      // Handle other errors
      return Promise.reject({ message: "An unexpected error occurred" });
    }
  }
};

export const getAverageCompletionTime = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/average-work-order-completion?clientId=${clientId}`,
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
      // Return the error response from the backend
      return Promise.reject(error.response.data);
    } else {
      // Handle other errors
      return Promise.reject({ message: "An unexpected error occurred" });
    }
  }
};

export const getWOByService = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/work-order-service?clientId=${clientId}`,
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
      // Return the error response from the backend
      return Promise.reject(error.response.data);
    } else {
      // Handle other errors
      return Promise.reject({ message: "An unexpected error occurred" });
    }
  }
};

export const getSuppliersByService = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/suppliers-by-service?clientId=${clientId}`,
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
      // Return the error response from the backend
      return Promise.reject(error.response.data);
    } else {
      // Handle other errors
      return Promise.reject({ message: "An unexpected error occurred" });
    }
  }
};
