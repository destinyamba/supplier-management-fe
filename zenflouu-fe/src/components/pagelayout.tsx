"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import { getUserDetails } from "@/apis/userManagementService";
import { User } from "@/types";
import { Grid2 } from "@mui/material";
import { grey } from "@mui/material/colors";
import {
  Binoculars,
  BuildingOffice,
  ClipboardText,
  SignOut,
  SquaresFour,
  UserCheck,
  UsersFour,
  UsersThree,
} from "@phosphor-icons/react";
import ClientOnly from "./ClientOnly/ClientOnly";
import { SideBar } from "./SideBar/SideBar";

export default function PageLayout({
  children,
  showSideBar = false,
}: Readonly<{
  children: React.ReactNode;
  showSideBar?: boolean;
}>) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState<User | null>(null);

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
          label: "Work Orders",
          href: "/work-orders",
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
      onClick: () => {
        localStorage.removeItem("authToken");
        document.cookie = `authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        router.push("/");
      },
    },
  ];

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
    <div style={{ display: "flex" }}>
      {showSideBar && (
        <Box sx={{ position: "fixed" }}>
          <ClientOnly>
            <SideBar
              userName={user?.name ?? ""}
              navItems={navItems(user?.userType ?? "")}
              organisationName={user?.organizationName ?? ""}
              additionalMenuItems={additionalMenuItems}
              isSideBarOpen={isSidebarOpen}
              onOpen={() => setIsSidebarOpen(true)}
              onClose={() => setIsSidebarOpen(false)}
            />
          </ClientOnly>
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
    </div>
  );
}
