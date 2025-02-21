"use client";

import { alpha, Box, styled, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import React, { useState } from "react";
import { ActionsMenu } from "../ActionsMenu/ActionsMenu";
import { User } from "@/types";
import { RoleChip } from "../RoleChip/RoleChip";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: "none",
  borderRadius: "16px",
  boxShadow: theme.shadows[3],
  overflow: "hidden",
  backgroundColor: theme.palette.background.paper,
  "& .MuiDataGrid-columnHaeaders": {
    backgroundColor: alpha(theme.palette.primary.main, 0.04),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  "& .MuiDataGrid-cell": {
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: "flex",
    alignItems: "center",
  },
  "& .MuiDataGrid-row:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.04),
  },
  "& .MuiDataGrid-footerContainer": {
    borderTop: `1px solid ${theme.palette.divider}`,
  },
}));

export const UsersManagementDataGrid = ({ users }: { users: User[] }) => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const columns: GridColDef[] = [
    {
      field: "firstName",
      headerName: "Name",
      width: 200,
      renderCell: (params: GridRenderCellParams<User>) => (
        <Typography>{params.row.name}</Typography>
      ),
      align: "left",
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "role",
      headerName: "Role",
      width: 120,
      renderCell: (params: GridRenderCellParams<User>) => (
        <RoleChip role={params.row.role} />
      ),
    },
    {
      field: "lastActive",
      headerName: "Last Active",
      width: 160,
      renderCell: (params: GridRenderCellParams<User>) => (
        <Typography>
          {new Date(params.row.organizationName).toUTCString()}
        </Typography>
      ),
    },
    {
      field: "dateAdded",
      headerName: "Date Added",
      width: 200,
      renderCell: (params: GridRenderCellParams<User>) => (
        <Typography>
          {new Date(params.row.userType).toLocaleDateString()}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "",
      width: 50,
      sortable: false,
      renderCell: (params: GridRenderCellParams<User>) => (
        <ActionsMenu userId={params.row.id} />
      ),
    },
  ];

  return (
    <>
      <Box sx={{ p: 3, height: "100%" }}>
        <StyledDataGrid
          rows={users}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 25, 50]}
          disableRowSelectionOnClick
          sx={{ minHeight: 400 }}
        />
      </Box>
    </>
  );
};
