"use client";
import { Grid2 } from "@mui/material";
import React from "react";
import PageLayout from "@/components/pagelayout";

const Dashboard = () => {
  return (
    <>
      <PageLayout showSideBar={true}>
        <Grid2 container>
          {/* Add your content here */}This is my dashboard
        </Grid2>
      </PageLayout>
    </>
  );
};

export default Dashboard;
