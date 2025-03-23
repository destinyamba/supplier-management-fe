"use client"
import PageLayout from "@/components/pagelayout";
import { WorkOrders } from "@/components/WorkOrders/WorkOrders";
import React from "react";

const WorkOrdersPage = () => {
  return (
    <>
      <title>ZenFlouu | Work Orders</title>
      <PageLayout showSideBar>
        <WorkOrders />
      </PageLayout>
    </>
  );
};

export default WorkOrdersPage;
