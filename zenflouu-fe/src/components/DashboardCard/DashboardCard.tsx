"use client";
import React from "react";
import { Typography, Card } from "@mui/material";
import { grey } from "@mui/material/colors";

interface StatCardProps {
  title: string;
  value?: number | string;
  children?: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  children,
}) => {
  return (
    <Card
      elevation={0}
      sx={{
        border: `1px solid ${grey[400]}`,
        minWidth: 200,
        borderRadius: 1,
        bgcolor: grey[100],
        p: 2,
      }}
    >
      <Typography variant="subtitle2" fontSize={10} fontWeight={600}>
        {title}
      </Typography>
      {children ? (
        children
      ) : (
        <Typography
          variant="h2"
          fontWeight={600}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {value}
        </Typography>
      )}
    </Card>
  );
};

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

export const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => {
  return (
    <Card
      elevation={0}
      sx={{
        flexGrow: 1,
        minHeight: 150,
        minWidth: 0,
        border: `1px solid ${grey[400]}`,
        borderRadius: 1,
        bgcolor: grey[100],
        p: 2,
      }}
    >
      <Typography variant="subtitle2" fontSize={10} fontWeight={600} mb={1}>
        {title}
      </Typography>
      {children}
    </Card>
  );
};
