"use client";
import React from "react";
import Layout from "../layout";
import { DiscoverSuppliers } from "@/components/DiscoverSuppliers/DiscoverSuppliers";

const Dashboard = () => {
  return (
    <>
      <Layout showSideBar={true}>
        <DiscoverSuppliers />
      </Layout>
    </>
  );
};

export default Dashboard;
