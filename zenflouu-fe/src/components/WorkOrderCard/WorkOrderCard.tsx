"use client";
import { getStatusConfig, IWorkOrder, mapWorkOrderStatus } from "@/types";
import { Card, CardContent, Box, Typography, Grid2 } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { StatusChip } from "xarton-1";

interface WorkOrderCardProps {
  workOrders: IWorkOrder;
}
const WorkOrderCard: React.FC<WorkOrderCardProps> = ({
  workOrders,
}: WorkOrderCardProps) => {
  return (
    <>
      {" "}
      <Grid2 size={{ md: 12 }} minWidth={390}>
        <Card sx={{ boxShadow: 1, borderRadius: 2, m: 0 }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                {/* worOrderNumber */}
                {workOrders.workOrderNumber}
              </Typography>
              <StatusChip
                label={mapWorkOrderStatus(workOrders?.status)}
                bgcolor={getStatusConfig(workOrders.status).backgroundColor}
                borderColor={getStatusConfig(workOrders.status).borderColor}
              />
            </Box>

            <Box
              sx={{
                backgroundColor: grey[100],
                p: 2,
                borderRadius: 2,
                display: "flex",
                justifyContent: "space-between",
                my: 2,
              }}
            >
              <Typography variant="subtitle2">Location: </Typography>
              <Typography variant="subtitle2">
                {workOrders?.location}{" "}
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: grey[100],
                p: 2,
                borderRadius: 2,
                display: "flex",
                justifyContent: "space-between",
                my: 2,
              }}
            >
              <Typography variant="subtitle2">Service: </Typography>
              <Typography variant="subtitle2">
                {workOrders?.service}{" "}
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: grey[100],
                p: 2,
                borderRadius: 2,
                display: "flex",
                justifyContent: "space-between",
                my: 2,
              }}
            >
              <Typography variant="subtitle2">Stat Date: </Typography>
              <Typography variant="subtitle2">
                {workOrders?.startDate?.toString()}
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: grey[100],
                p: 2,
                borderRadius: 2,
                display: "flex",
                justifyContent: "space-between",
                my: 2,
              }}
            >
              <Typography variant="subtitle2">Due Date: </Typography>
              <Typography variant="subtitle2">
                {workOrders?.dueDate?.toString()}{" "}
              </Typography>
            </Box>
            <Typography variant="caption" color={grey[600]}>
              {workOrders?.projectManager}
            </Typography>
          </CardContent>
        </Card>
      </Grid2>
    </>
  );
};

export default WorkOrderCard;
