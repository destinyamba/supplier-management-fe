import {
  Box,
  Typography,
  Menu,
  ListItemIcon,
  MenuItem,
  Divider,
  Stack,
  IconButton,
} from "@mui/material";
import { Building, Gear as GearIcon } from "@phosphor-icons/react";
import React from "react";
import { grey } from "@mui/material/colors";
import { CustomListItem } from "../CustomListItem/CustomListItem";
import { AdditionalMenuItem, Organization } from "../SideBar";

interface DrawerFooterProps {
  organisationName: string;
  ismobile: boolean;
  userName: string;
  isOpen: boolean;
  additionalMenuItems?: AdditionalMenuItem[];
  organizations?: Organization[];
  toggleOpen: () => void;
}
export const DrawerFooter: React.FC<DrawerFooterProps> = ({
  organisationName,
  ismobile,
  userName,
  isOpen,
  additionalMenuItems,
  organizations,
  toggleOpen,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ mt: !ismobile ? "auto" : " 0px" }}>
        <Divider
          sx={{ borderTop: ".5px solid", borderColor: grey[300], mt: 1 }}
        />
        {!ismobile ? (
          <>
            {isOpen ? (
              <Stack direction="row" justifyContent="space-between" p={2}>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography
                    variant="subtitle2"
                    noWrap
                    sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
                  >
                    {userName}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    fontSize="12px"
                    noWrap
                    color="textSecondary"
                    sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
                  >
                    {organisationName}
                  </Typography>
                </Box>
                <IconButton onClick={handleMenuOpen}>
                  <GearIcon size={24} />
                </IconButton>
              </Stack>
            ) : (
              <Stack p={2}>
                <IconButton onClick={handleMenuOpen}>
                  <GearIcon size={30} />
                </IconButton>
              </Stack>
            )}
          </>
        ) : (
          <>
            {additionalMenuItems?.map((item) => (
              <CustomListItem
                key={item.label}
                item={item}
                isOpen={isOpen}
                ismobile={ismobile}
                toggleOpen={toggleOpen}
              />
            ))}
          </>
        )}
        {!ismobile ? (
          <>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              onClick={handleMenuClose}
              sx={{ mt: -6, ml: 2, ".MuiMenu-paper": { borderRadius: "16px" } }}
            >
              {organizations && (
                <>
                  {organizations?.map((org) => (
                    <MenuItem key={org.id}>
                      <ListItemIcon>
                        <Building size={20} />
                      </ListItemIcon>
                      <Typography variant="body2">{org.name}</Typography>
                    </MenuItem>
                  ))}
                  <Divider
                    sx={{ borderTop: ".5px solid", borderColor: grey[300] }}
                  />
                </>
              )}

              {additionalMenuItems?.map((item, index) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    item.onClick && item.onClick();
                    handleMenuClose();
                  }}
                >
                  {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                  <Typography variant="body2">{item.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <></>
        )}
      </Box>
    </>
  );
};
