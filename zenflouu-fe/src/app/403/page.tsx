"use client";
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

const Forbidden: React.FC = () => {
  const router = useRouter();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h4" color="error">
        403 Forbidden
      </Typography>
      <Typography variant="body1" color="textSecondary">
        You do not have permission to access this page.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push("/sign-in")}
        sx={{ mt: 2 }}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default Forbidden;
