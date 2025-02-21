"use client";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { DotsThree } from "@phosphor-icons/react";
import React, { useState } from "react";

export const ActionsMenu: React.FC<{ userId: string }> = ({ userId }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    console.log("Edit user:", userId);
    handleCloseMenu();
  };

  const handleDelete = () => {
    console.log("Delete user:", userId);
    handleCloseMenu();
  };

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
        <MenuItem onClick={handleDelete} sx={{ gap: 1, color: "error.main" }}>
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};
