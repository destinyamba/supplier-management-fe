"use client";
import React from "react";
import { DiscoverSuppliers } from "@/components/DiscoverSuppliers/DiscoverSuppliers";
import PageLayout from "@/components/pagelayout";

const DiscoverPage = () => {
  return (
    <>
      <title>ZenFlouu | Discover</title>
      <PageLayout showSideBar={true}>
        <DiscoverSuppliers />
      </PageLayout>
    </>
  );
};

export default DiscoverPage;
