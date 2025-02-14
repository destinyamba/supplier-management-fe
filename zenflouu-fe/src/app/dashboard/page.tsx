"use client";
import { getUserDetails } from "@/apis/userManagementService";
import { Box, Card, CardContent, Grid2, Typography } from "@mui/material";
import {
  SquaresFour,
  UsersFour,
  Binoculars,
  ClipboardText,
  UsersThree,
  SignOut,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SideBar } from "xarton-1";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <SquaresFour size={24} />,
  },
  { label: "Suppliers", href: "/suppliers", icon: <UsersFour size={24} /> },
  { label: "Discover", href: "/discover", icon: <Binoculars size={24} /> },
  {
    label: "Compliance",
    href: "/compliance",
    icon: <ClipboardText size={24} />,
    badgeCount: 0,
  },
];

interface User {
  name: string;
  organizationName: string;
}

const Dashboard = () => {
  const router = useRouter();
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
  const additionalMenuItems = [
    {
      label: "User Management",
      icon: <UsersThree size={24} />,
      href: "/user-management",
      onClick: () => router.push("/user-management"),
    },
    {
      label: "Logout",
      icon: <SignOut size={24} />,
      href: "/",
      onClick: () => router.push("/"),
    },
  ];
  return (
    <>
      <SideBar
        userName={user?.name ?? ""}
        navItems={navItems}
        organisationName={user?.organizationName ?? ""}
        additionalMenuItems={additionalMenuItems}
      />
    </>
  );
};

export default Dashboard;
