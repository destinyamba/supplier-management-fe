import axios from "axios";

const API_BASE_URL = "http://localhost:6060/api/v1/supplier";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
};
export const onboardSupplier = async (
  supplierData: string,
  files: {
    coi?: File;
    safetyProgram?: File;
    oshaLogs?: File;
    bankInfo?: File;
  }
) => {
  const formData = new FormData();
  formData.append(
    "supplierData",
    new Blob([supplierData], { type: "application/json" })
  );

  Object.entries(files).forEach(([key, file]) => {
    if (file) formData.append(key, file);
  });
  const token = getToken();
  return axios.post(`${API_BASE_URL}/onboard-supplier`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
};
