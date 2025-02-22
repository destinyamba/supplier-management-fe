"use client";

import React, { useEffect, useState } from "react";
import Layout from "../layout";
import { Alert, Grid2, Snackbar, Typography } from "@mui/material";
import { getUserAssociatedOrgs } from "@/apis/userManagementService";
import axios, { AxiosError } from "axios";
import { User } from "../../types";
import { UsersManagementDataGrid } from "@/components/UsersManagementDataGrid/UsersManagementDataGrid";

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const handleCloseError = () => {
    setError(null);
  };
  useEffect(() => {
    const fetchListOfUsers = async () => {
      try {
        setError(null);
        const response = await getUserAssociatedOrgs();
        if (Array.isArray(response.data)) {
          setUsers(response.data);
          console.log(response.data);
        } else {
          console.log(response.data);
          console.error("Response data is not an array:", response.data);
        }
      } catch (error) {
        let errorMessage = "An unexpected error occurred during submission.";

        if (axios.isAxiosError(error)) {
          // Handle Axios errors
          const axiosError = error as AxiosError;
          errorMessage =
            axiosError.response?.data?.toString() ||
            axiosError.message ||
            "Failed to get user details.";
        }

        console.error("Fetch error:", error);
        setError(errorMessage);
      }
    };
    fetchListOfUsers();
  });
  return (
    <Layout showSideBar>
      <Grid2 container size={12} mx={2} display="flex" flexDirection="column">
        <Snackbar
          open={!!error}
          autoHideDuration={4000}
          onClose={handleCloseError}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            severity="error"
            onClose={handleCloseError}
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>
        <Typography variant="h4" fontWeight={600} m={2}>
          User Management
        </Typography>
        <Grid2>
          <UsersManagementDataGrid users={users} />
        </Grid2>
      </Grid2>
    </Layout>
  );
};

export default UserManagement;
