"use client";
import { cancelWorkOrder, getWorkOrder } from "@/apis/workOrdersService";
import { getStatusConfig, IWorkOrder, mapWorkOrderStatus } from "@/types";
import {
  Box,
  Breadcrumbs,
  Button,
  Grid2,
  Link,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { StatusChip } from "xarton-1";

export const WorkOrderDetail = () => {
  const [workOrder, setWorkOrder] = useState<IWorkOrder | null>(null);
  const params = useParams();
  const idParam = params?.id;

  const cancelWO = async () => {
    try {
      console.log("Cancelling work order...");
      const id = Array.isArray(idParam) ? idParam[0] : idParam;
      if (id) {
        await cancelWorkOrder(id);
        const updatedWorkOrder = await getWorkOrder(id);
        setWorkOrder(updatedWorkOrder);
      } else {
        console.error("Work order ID is missing.");
      }
    } catch (error) {
      console.error("Error canceling work order:", error);
    }
  };

  useEffect(() => {
    const id = Array.isArray(idParam) ? idParam[0] : idParam;

    if (id) {
      const fetchWorkOrder = async () => {
        try {
          const data = await getWorkOrder(id);
          setWorkOrder(data);
        } catch (error) {
          console.error("Error fetching work order:", error);
        }
      };

      fetchWorkOrder();
    } else {
      console.error("Work order ID is missing.");
    }
  }, [idParam]);
  return (
    <>
      <Grid2 container spacing={2}>
        <Grid2 container flexDirection="column" m={2}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/work-orders">
              Work Orders
            </Link>
            <Typography sx={{ color: "text.primary" }}>
              {workOrder?.workOrderNumber}
            </Typography>
          </Breadcrumbs>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" fontWeight={600}>
              Work Order Details
            </Typography>
            <Button
              sx={{
                color: "black",
                border: `1px solid ${red[200]}`,
                bgcolor: red[100],
                borderRadius: 32,
                height: 24,
                textTransform: "capitalize",
              }}
              onClick={cancelWO}
            >
              Cancel
            </Button>
          </Box>

          {workOrder && (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                  {workOrder.workOrderNumber}
                </Typography>
                <StatusChip
                  label={mapWorkOrderStatus(workOrder.status)}
                  bgcolor={getStatusConfig(workOrder.status).backgroundColor}
                  borderColor={getStatusConfig(workOrder.status).borderColor}
                />
              </Box>
              <Typography variant="body1">
                Location: {workOrder.location}
              </Typography>
              <Typography variant="body1">
                Service: {workOrder.service}
              </Typography>
              <Typography variant="body1">
                Due Date: {new Date(workOrder.dueDate).toLocaleDateString()}
              </Typography>
              <Typography variant="body1">
                Start Date: {new Date(workOrder.startDate).toLocaleDateString()}
              </Typography>
              <Typography variant="body1">
                Project Manager: {workOrder.projectManager}
              </Typography>
              <Typography variant="body1">
                Task Description: {workOrder.taskDescription}
              </Typography>
            </>
          )}
        </Grid2>
      </Grid2>
    </>
  );
};
