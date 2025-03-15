import { IWorkOrder, mapWorkOrderStatus, WorkOrderStatus } from "@/types";
import { Card, CardContent, Box, Typography, Grid2 } from "@mui/material";
import { green, red, blue, grey } from "@mui/material/colors";
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
      <Grid2 size={{ md: 12 }}>
        <Card sx={{ boxShadow: 1, borderRadius: 2, m: 0 }}>
          <CardContent>
            <Box>
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
                  bgcolor={
                    mapWorkOrderStatus(workOrders?.status) ===
                    WorkOrderStatus.COMPLETED
                      ? green[100]
                      : mapWorkOrderStatus(workOrders?.status) ===
                        WorkOrderStatus.IN_PROGRESS
                      ? blue[100]
                      : mapWorkOrderStatus(workOrders?.status) ===
                        WorkOrderStatus.CANCELLED
                      ? red[100]
                      : grey[100]
                  }
                  borderColor={
                    mapWorkOrderStatus(workOrders?.status) ===
                    WorkOrderStatus.COMPLETED
                      ? green[200]
                      : mapWorkOrderStatus(workOrders?.status) ===
                        WorkOrderStatus.IN_PROGRESS
                      ? blue[200]
                      : mapWorkOrderStatus(workOrders?.status) ===
                        WorkOrderStatus.CANCELLED
                      ? red[200]
                      : grey[200]
                  }
                />
              </Box>
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
