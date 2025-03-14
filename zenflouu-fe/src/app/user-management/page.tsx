"use client";

import React, { useEffect, useState } from "react";
import Layout from "../layout";
import { UserManagement } from "@/components/UserManagement/UserManagement";
import { getUserDetails } from "@/apis/userManagementService";
import { User } from "@/types";

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
  return <Layout showSideBar>{user && <UserManagement user={user} />}</Layout>;
};

export default UserManagementPage;
