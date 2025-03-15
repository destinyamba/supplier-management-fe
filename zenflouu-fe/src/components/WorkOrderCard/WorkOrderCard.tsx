import { IRequirementsStatus, IWorkOrder, WorkOrderStatus } from "@/types";
import { Stack, Card, CardContent, Box, Typography } from "@mui/material";
import { green, red, blue, purple, grey } from "@mui/material/colors";
import React from "react";
import { StatusChip } from "xarton-1";
import { SealCheck as SealCheckIcon } from "@phosphor-icons/react";

interface WorkOrderCardProps {
  workOrders: IWorkOrder;
}
const WorkOrderCard: React.FC<WorkOrderCardProps> = ({
  workOrders,
}: WorkOrderCardProps) => {
  return (
    <>
      {" "}
      <Stack>
        <Card sx={{ boxShadow: 1, borderRadius: 2, m: 0 }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box mr={0.5}>
                <SealCheckIcon size={12} color={blue[500]} weight="duotone" />
              </Box>

              <Typography variant="body2" fontSize={10}>
                {/* {mapContractType(suppliers.contractType)} */}
              </Typography>
            </Box>

            {/* name */}
            <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
              {/* worOrderNumber */}
              {workOrders?.workOrderNumber}
            </Typography>
            <Box
              sx={{
                justifyContent: "space-between",
              }}
            >
              <StatusChip
                label={WorkOrderStatus.IN_PROGRESS.toString()}
                bgcolor={blue[100]}
                borderColor={blue[200]}
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
              {/* services */}
              <Typography variant="subtitle2">Services</Typography>
              <Typography variant="subtitle2">
                {/* {suppliers.services.length} */}
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
              {/* states */}
              <Typography variant="subtitle2">States</Typography>
              <Typography variant="subtitle2">
                {/* {suppliers.states.length} */}
              </Typography>
            </Box>
            {/* yearsOfOperation & revenue & numberOfEmployees */}
            <Typography variant="caption" color={grey[600]}>
              {/* {suppliers.yearsOfOperation} Years in Operation |{" "}
              {suppliers.revenue.toString()} Annual Revenue |{" "}
              {suppliers.numberOfEmployees} Employees */}
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </>
  );
};

export default WorkOrderCard;
