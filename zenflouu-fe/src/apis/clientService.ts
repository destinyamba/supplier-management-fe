import axios from "axios";

const API_BASE_URL = "http://localhost:6060/api/v1/client";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
};

export const onboardClient = async (clientData: any) => {
  const token = getToken();
  console.log(clientData);
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
