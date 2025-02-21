"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useRouter } from "next/navigation";
import { getUserDetails } from "@/apis/userManagementService";
import { User } from "@/types";
import { Box, Grid2 } from "@mui/material";
import { grey } from "@mui/material/colors";
import {
  SquaresFour,
  UsersFour,
  Binoculars,
  ClipboardText,
  UserCheck,
  BuildingOffice,
  UsersThree,
  SignOut,
} from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { SideBar } from "xarton-1";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
  showSideBar = false,
}: Readonly<{
  children: React.ReactNode;
  showSideBar?: boolean;
}>) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = (
    userType: string
  ): {
    label: string;
    href: string;
    icon: React.ReactNode;
    badgeCount?: number;
  }[] => {
    if (userType === "CLIENT") {
      return [
        {
          label: "Dashboard",
          href: "/dashboard",
          icon: <SquaresFour size={24} />,
        },
        {
          label: "Suppliers",
          href: "/suppliers",
          icon: <UsersFour size={24} />,
        },
        {
          label: "Discover",
          href: "/discover",
          icon: <Binoculars size={24} />,
        },
        {
          label: "Compliance",
          href: "/compliance",
          icon: <ClipboardText size={24} />,
          badgeCount: 0,
        },
      ];
    } else {
      return [
        { label: "Clients", href: "/clients", icon: <UserCheck size={24} /> },
        {
          label: "Compliance",
          href: "/compliance",
          icon: <ClipboardText size={24} />,
        },
        {
          label: "Company",
          href: "/company",
          icon: <BuildingOffice size={24} />,
          badgeCount: 0,
        },
      ];
    }
  };

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{ backgroundColor: "white", display: "flex" }}
      >
        {showSideBar && (
          <Box sx={{ position: "fixed" }}>
            <SideBar
              userName={user?.name ?? ""}
              navItems={navItems(user?.userType ?? "")}
              organisationName={user?.organizationName ?? ""}
              additionalMenuItems={additionalMenuItems}
            />
          </Box>
        )}
        <Grid2
          container
          sx={{
            color: grey[800],
            flexGrow: 1,
            ml: showSideBar ? (isSidebarOpen ? "250px" : "72px") : "0",
          }}
        >
          <Grid2 size="grow">{children}</Grid2>
        </Grid2>
      </body>
    </html>
  );
}
