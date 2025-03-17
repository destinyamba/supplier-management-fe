"use client";
import { getSupplierById } from "@/apis/suppliersService";
import {
  IRequirementsStatus,
  ISupplierCard,
  IWorkStatus,
  getContractTypeColor,
  mapContractType,
  mapWorkStatus,
  mappedRequirementsStatus,
} from "@/types";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Stack,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Grid2,
} from "@mui/material";
import { green, red, blue, purple, grey } from "@mui/material/colors";
import {
  Building,
  Envelope,
  Money,
  SealCheck,
  Star,
  Timer,
  Trophy,
  UsersThree,
} from "@phosphor-icons/react";
import React, { useEffect } from "react";
import { StatusChip } from "xarton-1";

export const CompanyProfile: React.FC = () => {
  const [supplier, setSupplier] = React.useState<any>();
  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await getSupplierById();
        setSupplier(response.data);
      } catch (error) {
        console.error("Error fetching supplier:", error);
      }
    };

    fetchSupplier();
  }, []);

  if (!supplier) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      <Typography variant="h4" fontWeight={600} m={2}>
        Company Profile
      </Typography>
      <Card
        sx={{
          maxWidth: 600,
          mx: "auto",
          borderRadius: 2,
          boxShadow: 4,
          mb: 4,
        }}
        elevation={0}
      >
        <CardContent>
          {/* Contract Type */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
            <SealCheck
              size={12}
              color={getContractTypeColor(supplier.contractType)}
              weight="duotone"
            />
            <Typography variant="body2" fontSize={10} sx={{ ml: 0.5 }}>
              {mapContractType(supplier.contractType)}
            </Typography>
          </Box>

          {/* Company Name */}
          <Typography variant="h6" fontWeight={600} sx={{ mb: 1.5 }}>
            {supplier.supplierName}
          </Typography>

          {/* Status Chips */}
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <StatusChip
              label={mapWorkStatus(supplier.workStatus)}
              bgcolor={
                mapWorkStatus(supplier.workStatus) === IWorkStatus.APPROVED
                  ? green[100]
                  : red[100]
              }
              borderColor={
                mapWorkStatus(supplier.workStatus) === IWorkStatus.APPROVED
                  ? green[200]
                  : red[200]
              }
            />
            <StatusChip
              label={mappedRequirementsStatus(supplier.requirementsStatus)}
              bgcolor={
                mappedRequirementsStatus(supplier.requirementsStatus) ===
                IRequirementsStatus.REQUIREMENTS_SUBMITTED
                  ? blue[100]
                  : purple[100]
              }
              borderColor={
                mappedRequirementsStatus(supplier.requirementsStatus) ===
                IRequirementsStatus.REQUIREMENTS_SUBMITTED
                  ? blue[200]
                  : purple[200]
              }
            />
          </Stack>

          {/* Services */}
          <Paper
            variant="outlined"
            sx={{ bgcolor: grey[100], p: 2, mb: 2 }}
            elevation={0}
          >
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Building
                  style={{ fontSize: 18, color: grey[700], marginRight: 4 }}
                />
                <Typography variant="subtitle2">Services</Typography>
              </Box>
              <Typography variant="subtitle2">
                {supplier.services.length}
              </Typography>
            </Box>
            <List dense>
              {supplier.services.map((service: string, index: number) => (
                <ListItem key={index} sx={{ py: 0 }}>
                  <ListItemText primary={service} />
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Company Details */}
          <Stack direction="row" spacing={2} sx={{ mb: 2, flexWrap: "wrap" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Timer
                style={{ fontSize: 14, marginRight: 4, color: grey[600] }}
              />
              <Typography variant="caption" color={grey[600]}>
                {supplier.yearsOfOperation} Years in Operation
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Money
                style={{ fontSize: 14, marginRight: 4, color: grey[600] }}
              />
              <Typography variant="caption" color={grey[600]}>
                {supplier.revenue} Annual Revenue
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <UsersThree
                style={{ fontSize: 14, marginRight: 4, color: grey[600] }}
              />
              <Typography variant="caption" color={grey[600]}>
                {supplier.numberOfEmployees} Employees
              </Typography>
            </Box>
          </Stack>

          {/* Contact Information */}
          <Paper
            variant="outlined"
            sx={{ bgcolor: grey[100], p: 2, mb: 2 }}
            elevation={0}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Envelope
                style={{ fontSize: 18, marginRight: 4, color: grey[700] }}
              />
              <Typography variant="subtitle2">Contact Information</Typography>
            </Box>
            <Box>
              <Typography variant="body2" fontWeight={500}>
                {supplier.contactInfo.primaryContact.primaryContactName}
              </Typography>
              <Typography variant="caption" color={grey[600]}>
                {supplier.contactInfo.primaryContact.primaryContactEmail}
              </Typography>
            </Box>
          </Paper>

          {/* Business Classifications */}
          <Paper
            variant="outlined"
            sx={{ bgcolor: grey[100], p: 2 }}
            elevation={0}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Trophy
                style={{ fontSize: 18, marginRight: 4, color: grey[700] }}
              />
              <Typography variant="subtitle2">
                Business Classifications
              </Typography>
            </Box>
            <Grid2 container spacing={1}>
              {Object.entries(supplier.businessClassifications).map(
                ([key, value]: [string, any]) =>
                  value && (
                    <Grid2
                      size={{ md: 6 }}
                      key={key}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <ListItemIcon sx={{ minWidth: 24 }}>
                        <Star style={{ fontSize: 14, color: "orange" }} />
                      </ListItemIcon>
                      <Typography variant="caption">{key}</Typography>
                    </Grid2>
                  )
              )}
            </Grid2>
          </Paper>
        </CardContent>
      </Card>
    </>
  );
};
