import React, { useState } from "react";
import styled from "styled-components";
import {
  Box,
  List,
  ListItemIcon,
  ListItemText,
  Drawer,
  ListItemButton,
  Divider,
  ListItem,
  IconButton,
  Stack,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ArrowCircleLeft, ArrowCircleRight } from "@phosphor-icons/react";
import { grey, red } from "@mui/material/colors";
import { DrawerHeader } from "./DrawerHeader/DrawerHeader";
import { CustomListItem } from "./CustomListItem/CustomListItem";
import { DrawerFooter } from "./DrawerFooter/DrawerFooter";
import { AppBarComponent } from "./AppBarComponent";

const StyledDrawer = styled(Drawer)<{
  drawerwidth: number;
  ismobile?: string;
}>(({ drawerwidth, ismobile }) => ({
  width: ismobile ? "100%" : drawerwidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: ismobile ? "100%" : drawerwidth,
    boxSizing: "border-box",
    backgroundColor: grey[100],
    borderWidth: 0,
    borderRadius: ismobile ? 0 : "0 16px 16px 0",
  },
}));

const StyledIconButton = styled(IconButton)<{ active?: string }>(
  ({ active }) => ({
    padding: 0,
    borderRadius: "32px",
    backgroundColor: active === "true" ? grey[200] : "transparent",
    "&:hover": {
      backgroundColor: grey[200],
    },
  })
);

export interface AdditionalMenuItem {
  label: string;
  onClick?: () => void;
  icon: React.ReactNode;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badgeCount?: number;
  onClick?: () => void;
}

export interface Organization {
  id: string;
  name: string;
}

export interface SidebarProps {
  navItems: NavItem[];
  drawerwidth?: number;
  userName?: string;
  organisationName?: string;
  initialIsOpen?: boolean;
  ismobile?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  children?: React.ReactNode;
  preContentChildren?: React.ReactNode;
  additionalMenuItems?: AdditionalMenuItem[];
  organizations?: Organization[];
  isSideBarOpen?: boolean;
}

export const SideBar = ({
  navItems,
  drawerwidth = 240,
  userName,
  organisationName,
  initialIsOpen = true,
  ismobile,
  onOpen,
  onClose,
  children,
  preContentChildren,
  additionalMenuItems,
  organizations,
  isSideBarOpen,
}: SidebarProps) => {
  const theme = useTheme();
  ismobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  const toggleDrawer = () => {
    if (!isOpen) {
      onOpen?.();
    } else {
      onClose?.();
    }
    setIsOpen(!isOpen);
  };
  isSideBarOpen = isOpen;
  return (
    <>
      <Box component="nav" position="relative">
        {ismobile && (
          <AppBarComponent isOpen={isOpen} toggleOpen={toggleDrawer} />
        )}
        <StyledDrawer
          transitionDuration={400}
          anchor={ismobile ? "top" : undefined}
          ismobile={ismobile ? "true" : undefined}
          drawerwidth={isOpen ? drawerwidth : 72}
          variant={ismobile ? "temporary" : "permanent"}
          open={isOpen}
          sx={{
            "& .MuiDrawer-paper": {
              borderWidth: 0,
              minHeight: "100%",
              borderRadius: !ismobile ? "0 16px 16px 0" : 0,
            },
          }}
        >
          <Stack
            flexDirection="column"
            flexGrow={1}
            sx={{
              ...(!isOpen &&
                !ismobile && {
                  alignItems: "center",
                }),
              backgroundColor: grey[100],
              overflowX: "hidden",
              mt: ismobile && isOpen ? 11 : 0,
              borderRadius: {
                xs: 0,
                md: "0 16px 16px 0",
              },
            }}
          >
            {!ismobile && <DrawerHeader ismobile={ismobile} isOpen={isOpen} />}
            <List
              disablePadding
              sx={{
                p: 0,
                mt: !ismobile ? 7 : 0,
                textDecoration: "none",
              }}
            >
              {navItems?.map((item) => (
                <CustomListItem
                  key={item.label}
                  item={item}
                  isOpen={isOpen}
                  ismobile={ismobile}
                  toggleOpen={toggleDrawer}
                />
              ))}
            </List>
            {preContentChildren}
            {children}
            <DrawerFooter
              organisationName={organisationName ?? ""}
              ismobile={ismobile}
              userName={userName ?? ""}
              isOpen={isOpen}
              additionalMenuItems={additionalMenuItems}
              organizations={organizations}
              toggleOpen={toggleDrawer}
            />
          </Stack>
        </StyledDrawer>

        {!ismobile && (
          <StyledIconButton
            onClick={toggleDrawer}
            active={isOpen ? "true" : "false"}
            sx={{
              position: "fixed",
              left: isOpen ? 228 : 60,
              color: "grey.800",
              bgcolor: "common.white",
              boxShadow: 0,
              "&:hover": {
                bgcolor: grey[300],
              },
              p: 0,
              zIndex: 1300,
              top: 90,
            }}
          >
            {isOpen ? <ArrowCircleLeft size={24} /> : <ArrowCircleRight />}
          </StyledIconButton>
        )}
      </Box>
    </>
  );
};
