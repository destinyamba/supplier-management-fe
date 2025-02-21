"use client";

import { Role, User } from "@/types";
import { Chip } from "@mui/material";
import React from "react";

export const RoleChip: React.FC<{ role: User["role"] }> = ({ role }) => {
  const colors: Record<Role, "success" | "primary" | "default"> = {
    [Role.ADMIN]: "success",
    [Role.EDITOR]: "primary",
    [Role.VIEWER]: "default",
  };

  return (
    <Chip
      label={role}
      size="small"
      color={role ? colors[role] : "default"}
      sx={{ borderRadius: 16 }}
      variant="outlined"
    />
  );
};
