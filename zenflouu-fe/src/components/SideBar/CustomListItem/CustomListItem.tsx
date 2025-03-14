"use client";
import styled from "styled-components";
import { NavItem } from "../../interfaces/types";
import {
  Badge,
  Grid2,
  Link,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { blue, grey } from "@mui/material/colors";
import { usePathname } from "next/navigation";

interface CustomListItemProps {
  item: NavItem;
  isOpen: boolean;
  ismobile?: boolean;
  toggleOpen?: () => void;
}

const StyledListItemButton = styled(ListItemButton)<{ isactive?: string }>(
  ({ isactive }) => ({
    borderRadius: "4px",
    backgroundColor: isactive === "true" ? grey[300] : "transparent",
    "&:hover": {
      backgroundColor: grey[200],
    },
  })
);

interface BadgeProps {
  isStatic?: boolean;
  className?: string;
  children: React.ReactNode;
}

const CustomBadge = styled.div<BadgeProps & { isDot?: boolean }>`
  background-color: ${blue[500]};
  color: white;
  border-radius: 32px;
  padding: 0 6px;
  font-size: 12px;
  line-height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 8px;
  height: 20px;
  margin-left: ${(props) => (props.isStatic ? "8px" : "0")};
`;

export const CustomListItem: React.FC<CustomListItemProps> = ({
  item,
  isOpen,
  ismobile,
  toggleOpen,
}) => {
  const pathname = usePathname();
  const isactive = pathname === item.href || pathname.startsWith(item.href);

  const handleClick = (event: React.MouseEvent) => {
    if (item.onClick) {
      event.preventDefault();
      item.onClick();
      return;
    }

    if (ismobile && toggleOpen) {
      toggleOpen();
    }
  };

  const LinkComponent = styled(Link)({
    color: "inherit",
    display: "flex",
    width: "100%",
  });

  return (
    <ListItem
      disablePadding
      sx={{
        px: isOpen ? 2 : 0,
      }}
    >
      <LinkComponent
        href={item.href}
        onClick={handleClick}
        sx={{ textDecoration: "none" }}
      >
        <StyledListItemButton
          isactive={isactive ? "true" : "false"}
          sx={{
            mt: 1,
            padding: isOpen ? 2 : 1.5,
            minWidth: isOpen ? "auto" : "48px",
            justifyContent: isOpen ? "flex-start" : "center",
            borderRadius: 1,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: isOpen ? "24px" : "32px",
              mr: isOpen ? 2 : 0,
              color: grey[900],
              minHeight: isOpen ? "24px" : "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {!isOpen && !ismobile && item.badgeCount ? (
              <Badge color="primary" variant="dot">
                {item.icon}
              </Badge>
            ) : (
              item.icon
            )}
          </ListItemIcon>

          {isOpen && (
            <ListItemText
              sx={{ my: 0 }}
              primary={
                <Grid2
                  container
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ height: "24px" }}
                >
                  <Typography variant="subtitle2" noWrap color={grey[900]}>
                    {item.label}
                  </Typography>
                  {item.badgeCount && item.badgeCount > 0 ? (
                    <CustomBadge isStatic>{item.badgeCount}</CustomBadge>
                  ) : (
                    <></>
                  )}
                </Grid2>
              }
            />
          )}
        </StyledListItemButton>
      </LinkComponent>
    </ListItem>
  );
};
