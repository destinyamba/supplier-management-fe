"use client";
import React from "react";
import { DiscoverSuppliers } from "@/components/DiscoverSuppliers/DiscoverSuppliers";
import PageLayout from "@/components/pagelayout";

const Dashboard = () => {
  return (
    <>
      <PageLayout showSideBar={true}>
        <DiscoverSuppliers />
      </PageLayout>
    </>
  );
};

export default Dashboard;
