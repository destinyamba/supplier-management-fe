import { Box, Typography } from "@mui/material";
import React from "react";
interface DrawerHeaderProps {
  ismobile: boolean;
  isOpen: boolean;
}
export const DrawerHeader: React.FC<DrawerHeaderProps> = ({
  ismobile,
  isOpen,
}) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 2,
        }}
      >
        {/* App Logo */}
        {!ismobile && isOpen ? (
          <img
            src="zenflouu-logo.svg"
            alt="ZenFlouu Logo"
            width={240}
            height={50}
          />
        ) : (
          <img
            src="zenflouu_black_logo.png"
            alt="ZenFlouu Logo"
            width={50}
            height={35}
          />
        )}
      </Box>
    </>
  );
};
