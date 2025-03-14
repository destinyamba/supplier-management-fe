"use client";

import React, { useEffect, useState } from "react";
import { UserManagement } from "@/components/UserManagement/UserManagement";
import { getUserDetails } from "@/apis/userManagementService";
import { User } from "@/types";
import PageLayout from "@/components/pagelayout";

const UserManagementPage = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserDetails();
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);
  return (
    <>
      <title>ZenFlouu | User Management</title>
      <PageLayout showSideBar>
        {user && <UserManagement user={user} />}
      </PageLayout>
    </>
  );
};

export default UserManagementPage;
