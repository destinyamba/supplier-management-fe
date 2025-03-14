"use client";
import {
  deleteUser,
  editUser,
  getUserById,
} from "@/apis/userManagementService";
import { Alert, IconButton, Menu, MenuItem, Snackbar } from "@mui/material";
import { DotsThree } from "@phosphor-icons/react";
import React, { useState } from "react";
import { UserDialog } from "../UserDialog/UserDialog";

export const ActionsMenu: React.FC<{
  userId: string;
  currentUser: any;
}> = ({ userId, currentUser }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = async () => {
    try {
      const response = await getUserById(userId);
      setSelectedUser(response.data);
      setEditDialogOpen(true);
    } catch (error) {
      console.error("Error fetching user details:", error);
      setSnackbarMessage("Error fetching user details");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
    handleCloseMenu();
  };

  const handleUpdateUser = async (values: {
    name: string;
    email: string;
    role: string;
  }) => {
    try {
      await editUser(userId, values.name, values.email, values.role);
      setSnackbarMessage("User updated successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Error updating user");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(userId);
      setSnackbarMessage("User deleted successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error deleting user:", error);
      const errorMessage =
        (error as any).response?.data?.message || (error as Error).message;
      setSnackbarMessage(`Error deleting user: ${errorMessage}`);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
    handleCloseMenu();
  };

  const isCurrentUser = currentUser.userId === userId;
  const isAdmin = currentUser.role === "ADMIN";

  return (
    <>
      <IconButton
        onClick={handleOpenMenu}
        size="small"
        sx={{ color: "text.secondary" }}
      >
        <DotsThree weight="bold" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        sx={{ minWidth: 140 }}
      >
        <MenuItem onClick={handleEdit} sx={{ gap: 1 }}>
          Edit
        </MenuItem>
        {isAdmin && !isCurrentUser && (
          <MenuItem onClick={handleDelete} sx={{ gap: 1, color: "error.main" }}>
            Delete
          </MenuItem>
        )}
      </Menu>
      <UserDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        initialValues={
          selectedUser
            ? {
                name: selectedUser.name,
                email: selectedUser.email,
                role: selectedUser.role,
              }
            : { name: "", email: "", role: "" }
        }
        onSubmit={handleUpdateUser}
        title="Edit User"
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
