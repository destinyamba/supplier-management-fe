"use client";
import { Grid2 } from "@mui/material";
import React from "react";
import Layout from "../layout";

interface User {
  name: string;
  organizationName: string;
}

const Dashboard = () => {
  return (
    <>
      <Layout showSideBar={true}>
        <Grid2 container>
          {/* Add your content here */}This is my dashboard
        </Grid2>
      </Layout>
    </>
  );
};

export default Dashboard;
