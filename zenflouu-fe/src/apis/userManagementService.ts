import axios from "axios";

const API_BASE_URL = "http://localhost:6060/api/v1/user-details";

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

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
};

export const getUserDetails = async () => {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }

  const decodedToken = decodeToken(token);
  if (!decodedToken || !decodedToken.sub) {
    throw new Error("Invalid token");
  }

  const userEmail = decodedToken.sub;

  return axios.post(`${API_BASE_URL}/get-user-details`, { userEmail });
};

export const getUserAssociatedOrgs = async () => {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }

  const decodedToken = decodeToken(token);
  if (!decodedToken || !decodedToken.sub) {
    throw new Error("Invalid token");
  }

  const orgId = decodedToken.orgId;

  return axios.get(`${API_BASE_URL}/associated-org-users/${orgId}`);
};

export const inviteUserInitial = async (
  name: string,
  email: string,
  role: string
) => {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }

  const decodedToken = decodeToken(token);
  if (!decodedToken || !decodedToken.sub) {
    throw new Error("Invalid token");
  }

  const orgId = decodedToken.orgId;
  const userType = decodedToken.businessType;

  return axios.post(`${API_BASE_URL}/invite-user-initial`, {
    name,
    email,
    role,
    orgId,
    businessType: userType,
  });
};

export const inviteUserComplete = async (email: string, password: string) => {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }

  const decodedToken = decodeToken(token);
  if (!decodedToken || !decodedToken.sub) {
    throw new Error("Invalid token");
  }

  return axios.post(
    `${API_BASE_URL}/invite-user-complete/${email}/${password}`
  );
};
