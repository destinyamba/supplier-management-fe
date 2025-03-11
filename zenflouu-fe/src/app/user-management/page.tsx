"use client";

import React from "react";
import Layout from "../layout";
import { UserManagement } from "@/components/UserManagement/UserManagement";

const UserManagementPage = () => {
  return (
    <Layout showSideBar>
      <UserManagement />
    </Layout>
  );
};

export default UserManagementPage;
