"use client";
import { Grid2 } from "@mui/material";
import React from "react";
import PageLayout from "@/components/pagelayout";
import { Dashboard } from "@/components/Dashboard/Dashboard";

const DashboardPage = () => {
  return (
    <>
      <title>ZenFlouu | Dashboard</title>
      <PageLayout showSideBar={true}>
        <Grid2 container mx={2} my={2}>
          <Dashboard />
        </Grid2>
      </PageLayout>
    </>
  );
};

export default DashboardPage;
