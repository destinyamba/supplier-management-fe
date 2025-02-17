"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SideBar } from "xarton-1";
import {
  SquaresFour,
  UsersFour,
  Binoculars,
  ClipboardText,
  SignOut,
  UsersThree,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { getUserDetails } from "@/apis/userManagementService";
import { useState, useEffect } from "react";
import router from "next/router";
import { blueGrey, grey } from "@mui/material/colors";
import { Box } from "@mui/material";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface User {
  name: string;
  organizationName: string;
}
export default function RootLayout({
  children,
  showSideBar = false,
}: Readonly<{
  children: React.ReactNode;
  showSideBar?: boolean;
}>) {
  const router = useRouter();
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
              navItems={navItems}
              organisationName={user?.organizationName ?? ""}
              additionalMenuItems={additionalMenuItems}
            />
          </Box>
        )}
        <Box
          sx={{
            ml: showSideBar ? "250px" : "0",
            flexGrow: 1,
            color: grey[800],
          }}
        >
          {children}
        </Box>
      </body>
    </html>
  );
}
