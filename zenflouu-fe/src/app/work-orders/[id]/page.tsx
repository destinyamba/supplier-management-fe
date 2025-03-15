"use client";
import PageLayout from "@/components/pagelayout";
import { WorkOrderDetail } from "@/components/WorkOrderDetail/WorkOrderDetail";
import React from "react";

const WorkOrderDetailPage = () => {
  return (
    <>
      <title>ZenFlouu | Work Order Details</title>
      <PageLayout showSideBar>
        <WorkOrderDetail />
      </PageLayout>
    </>
  );
};

export default WorkOrderDetailPage;
