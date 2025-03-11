import { getUserAssociatedOrgs } from "@/apis/userManagementService";
import { User } from "@/types";
import {
  Grid2,
  Snackbar,
  Alert,
  Typography,
  Button,
  Stack,
  Dialog,
  TextField,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { UsersManagementDataGrid } from "../UsersManagementDataGrid/UsersManagementDataGrid";
import { Plus } from "@phosphor-icons/react";
import { UserDialog } from "../UserDialog/UserDialog";

export const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [toggleDialog, setToggleDialog] = useState<boolean>(false);
  const handleCloseError = () => {
    setError(null);
  };
  const handleToggleDialog = () => {
    setToggleDialog(true);
  };
  const handleDialogClose = () => {
    setToggleDialog(false);
  };
  useEffect(() => {
    const fetchListOfUsers = async () => {
      try {
        setError(null);
        const response = await getUserAssociatedOrgs();
        if (Array.isArray(response.data)) {
          setUsers(response.data);
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
    <Stack>
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

      <Stack flexDirection="row" justifyContent="space-between" mx={1}>
        <Typography variant="h4" fontWeight={600} m={2}>
          User Management
        </Typography>
        <Button
          variant="contained"
          sx={{ mr: 2, mt: 2, height: 40, borderRadius: 32 }}
          size="medium"
          startIcon={<Plus />}
          onClick={handleToggleDialog}
        >
          Invite User
        </Button>
        <UserDialog open={toggleDialog} onClose={handleDialogClose} />
      </Stack>
      <Grid2>
        <UsersManagementDataGrid users={users} />
      </Grid2>
    </Stack>
  );
};
