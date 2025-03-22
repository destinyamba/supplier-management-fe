"use client";
import PageLayout from "@/components/pagelayout";
import { SupplierDetail } from "@/components/SupplierDetail/SupplierDetail";
import React from "react";

const SupplerDetailPage = () => {
  return (
    <>
      <title>ZenFlouu | Supplier Details</title>
      <PageLayout showSideBar>
        <SupplierDetail />
      </PageLayout>
    </>
  );
};

export default SupplerDetailPage;
