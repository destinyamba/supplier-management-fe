"use client";
import { CompanyProfile } from "@/components/CompanyProfile/CompanyProfile";
import PageLayout from "@/components/pagelayout";
import React from "react";

const CompanyProfilePage = () => {
  return (
    <>
      <title>ZenFlouu | Company Profile</title>
      <PageLayout showSideBar>
        <CompanyProfile />
      </PageLayout>
    </>
  );
};

export default CompanyProfilePage;
