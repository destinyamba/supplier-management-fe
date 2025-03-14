import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
} from "@mui/material";
import {
  X as CloseRoundedIcon,
  List as MenuRoundedIcon,
} from "@phosphor-icons/react";
import React from "react";

interface AppBarProps {
  isOpen?: boolean;
  toggleOpen?: () => void;
  isCaptive?: boolean;
  isNonCaptive?: boolean;
  onCancelOnboarding?: () => void;
}

export const AppBarComponent: React.FC<AppBarProps> = ({
  toggleOpen,
  isOpen,
  isCaptive,
  isNonCaptive,
  onCancelOnboarding,
}) => {
  return (
    <>
      <AppBar
        color="default"
        sx={{
          borderRadius: 0,
          boxShadow: "none",
          position: "fixed",
          zIndex: 1300,
        }}
      >
        <Toolbar variant="dense" sx={{ p: 2.125 }}>
          {!isCaptive && !isNonCaptive && (
            <IconButton
              onClick={toggleOpen}
              aria-label="toggle appbar button"
              sx={{
                p: 1.5,
                "&:hover": {
                  bgcolor: "transparent",
                },
                color: "grey.900",
              }}
            >
              {isOpen ? (
                <CloseRoundedIcon data-testid="close-icon" size={30} />
              ) : (
                <MenuRoundedIcon data-testid="menu-icon" size={30} />
              )}
            </IconButton>
          )}
          {!isCaptive && !isNonCaptive && (
            <Box
              sx={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%) translateY(-50%)",
                top: "50%",
              }}
            >
              <img
                src="zenflouu-logo.svg"
                alt="ZenFlouu Logo"
                width={240}
                height={50}
              />
            </Box>
          )}
          {(isCaptive || isNonCaptive) && (
            <Box>
              <img
                src="zenflouu-logo.svg"
                alt="ZenFlouu Logo"
                width={240}
                height={50}
              />
            </Box>
          )}
          {isCaptive && (
            <IconButton
              disableRipple
              onClick={toggleOpen}
              aria-label="toggle appbar button"
              sx={{
                p: 1.5,
                "&:hover": {
                  bgcolor: "transparent",
                },
                color: "grey.900",
                marginLeft: "auto",
              }}
            >
              <Button
                variant="outlined"
                size="medium"
                disableElevation
                disableRipple
                sx={{ borderRadius: 32 }}
                onClick={onCancelOnboarding}
              >
                Cancel Onbaording
              </Button>
            </IconButton>
          )}
          {isNonCaptive && (
            <IconButton
              onClick={toggleOpen}
              aria-label="toggle appbar button"
              sx={{
                p: 1.5,
                "&:hover": {
                  bgcolor: "transparent",
                },
                color: "grey.900",
                marginLeft: "auto",
              }}
            >
              <CloseRoundedIcon data-testid="close-icon" size={30} />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};
