"use client";
import { Compliance } from "@/components/Compliance/Compliance";
import PageLayout from "@/components/pagelayout";
import React from "react";

const CompliancePage = () => {
  return (
    <>
      <title>ZenFlouu | Compliance</title>
      <PageLayout showSideBar>
        <Compliance />
      </PageLayout>
    </>
  );
};

export default CompliancePage;
