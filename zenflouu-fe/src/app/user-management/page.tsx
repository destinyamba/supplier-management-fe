"use client";

import React from "react";
import Layout from "../layout";
import { Grid2, Typography } from "@mui/material";
import { UsersManagementDataGrid } from "xarton-1";

const UserManagement = () => {
  return (
    <Layout showSideBar>
      <Grid2 container size={12} mx={2} display="flex" flexDirection="column">
        <Typography variant="h4" fontWeight={600} m={2}>
          User Management
        </Typography>
        <Grid2>
          <UsersManagementDataGrid users={[]} />
        </Grid2>
      </Grid2>
    </Layout>
  );
};

export default UserManagement;
