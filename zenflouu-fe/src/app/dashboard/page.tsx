"use client";
import {
  SquaresFour,
  UsersFour,
  Binoculars,
  ClipboardText,
  UsersThree,
} from "@phosphor-icons/react";
import React from "react";
import { SideBar } from "xarton-1";

const navItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: <SquaresFour size={24} />,
  },
  { label: "Suppliers", href: "/suppliers", icon: <UsersFour size={24} /> },
  { label: "Discover", href: "/discover", icon: <Binoculars size={24} /> },
  {
    label: "Compliance",
    href: "/compliance",
    icon: <ClipboardText size={24} />,
    badgeCount: 7,
  },
];

const additionalMenuItems = [
  {
    label: "User Management",
    icon: <UsersThree size={24} />,
    href: "/user-management",
  },
];

const Dashboard = () => {
  return (
    <>
      <SideBar
        userName={"John Doe"}
        navItems={navItems}
        organisationName={"Mark & Vini LLC"}
        additionalMenuItems={additionalMenuItems}
      />
    </>
  );
};

export default Dashboard;
