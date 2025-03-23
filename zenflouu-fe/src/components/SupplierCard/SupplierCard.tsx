"use client"
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
import { SealCheck as SealCheckIcon } from "@phosphor-icons/react";
import { blue, green, grey, purple, red } from "@mui/material/colors";
import {
  ISupplierCard,
  IContractType,
  IWorkStatus,
  IRequirementsStatus,
  mapContractType,
  mapWorkStatus,
  mappedRequirementsStatus,
  getContractTypeColor,
} from "@/types";
import { StatusChip } from "xarton-1";

interface SupplierCardProps {
  suppliers: ISupplierCard;
}

export const SupplierCard: React.FC<SupplierCardProps> = ({
  suppliers,
}: SupplierCardProps) => {
  return (
    <>
      <Stack>
        <Card sx={{ boxShadow: 1, borderRadius: 2, m: 0 }}>
          <CardContent>
            {/* contranct type */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box mr={0.5}>
                <SealCheckIcon
                  size={12}
                  color={getContractTypeColor(suppliers.contractType)}
                  weight="duotone"
                />
              </Box>

              <Typography variant="body2" fontSize={10}>
                {mapContractType(suppliers.contractType)}
              </Typography>
            </Box>

            {/* name */}
            <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
              {suppliers.supplierName}
            </Typography>
            {/* workStatus & requirementsStatus */}
            <Box
              sx={{
                justifyContent: "space-between",
              }}
            >
              <StatusChip
                label={mapWorkStatus(suppliers.workStatus)}
                bgcolor={
                  mapWorkStatus(suppliers.workStatus) === IWorkStatus.APPROVED
                    ? green[100]
                    : red[100]
                }
                borderColor={
                  mapWorkStatus(suppliers.workStatus) === IWorkStatus.APPROVED
                    ? green[200]
                    : red[200]
                }
              />
              <StatusChip
                label={mappedRequirementsStatus(suppliers.requirementsStatus)}
                bgcolor={
                  mappedRequirementsStatus(suppliers.requirementsStatus) ===
                  IRequirementsStatus.REQUIREMENTS_SUBMITTED
                    ? blue[100]
                    : purple[100]
                }
                borderColor={
                  mappedRequirementsStatus(suppliers.requirementsStatus) ===
                  IRequirementsStatus.REQUIREMENTS_SUBMITTED
                    ? blue[200]
                    : purple[200]
                }
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
                {suppliers.services.length}
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
                {suppliers.states.length}
              </Typography>
            </Box>
            {/* yearsOfOperation & revenue & numberOfEmployees */}
            <Typography variant="caption" color={grey[600]}>
              {suppliers.yearsOfOperation} Years in Operation |{" "}
              {suppliers.revenue.toString()} Annual Revenue |{" "}
              {suppliers.numberOfEmployees} Employees
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </>
  );
};
