"use client";
import { addSupplierToList, getClientSuppliers } from "@/apis/clientService";
import { getASupplier, getSupplierById } from "@/apis/suppliersService";
import { getUserDetails } from "@/apis/userManagementService";
import {
  getContractTypeColor,
  IRequirementsStatus,
  ISupplierCard,
  IWorkStatus,
  mapContractType,
  mappedRequirementsStatus,
  mapWorkStatus,
  User,
  IContractType,
  IRevenue,
  IEmployees,
} from "@/types";
import {
  Breadcrumbs,
  Typography,
  Box,
  Button,
  Link,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Alert,
  Snackbar,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Divider,
  Chip,
  Avatar,
} from "@mui/material";
import {
  Building,
  Envelope,
  Money,
  Plus,
  SealCheck,
  Star,
  Timer,
  Trophy,
  UsersThree,
  Calendar,
  MapPin,
  Handshake,
  ChartBar,
  Shield,
  CurrencyDollar,
  User as UserIcon,
  Certificate,
  ClipboardText,
  FileText,
  Bank,
} from "@phosphor-icons/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CompanyProfile } from "../CompanyProfile/CompanyProfile";
import {
  green,
  red,
  blue,
  purple,
  grey,
  orange,
  amber,
} from "@mui/material/colors";
import { StatusChip } from "xarton-1";

export const SupplierDetail = () => {
  const [supplier, setSupplier] = useState<ISupplierCard | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [open, setDialog] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [isSupplierPresent, setIsSupplierPresent] = useState(true);
  const params = useParams();
  const idParam = params?.id;
  const id = Array.isArray(idParam) ? idParam[0] : idParam;

  const formik = useFormik({
    initialValues: { contractType: "" },
    validationSchema: Yup.object({
      contractType: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        if (!id) return;
        await addSupplierToList(id, values.contractType);
        setSnackbarMessage("Supplier added to list successfully");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setSubmitting(false);
        handleClose();
      } catch (error) {
        console.error("Error adding supplier to list:", error);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        setSnackbarMessage("Error adding supplier to list");
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (id) {
      checkIfSupplierIsPresent();
      const fetchSupplier = async () => {
        try {
          const response = await getASupplier(id);
          const data = response.data;
          setSupplier(data);
        } catch (error) {
          console.error("Error fetching supplier:", error);
        }
      };

      fetchSupplier();
    } else {
      console.error("Supplier ID is missing.");
    }
  }, [id]);

  const checkIfSupplierIsPresent = async () => {
    try {
      let currentPage = 1;
      let hasMorePages = true;

      while (hasMorePages) {
        const response = await getClientSuppliers(currentPage);
        const { suppliers, page, totalPages } = response.data;

        const supplierExists = suppliers.some(
          (supplier: any) => supplier.id === id
        );

        if (supplierExists) {
          setIsSupplierPresent(true);
          break;
        }

        if (page >= totalPages - 1) {
          hasMorePages = false;
          setIsSupplierPresent(false);
        } else {
          currentPage++;
        }
      }
    } catch (error) {
      console.error("Error checking if supplier is present:", error);
      setIsSupplierPresent(false);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserDetails();
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleClose = () => {
    setDialog(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Stack m={2}>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>

        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/discover">
            Discover
          </Link>
          <Typography sx={{ color: "text.primary" }}>
            {supplier?.supplierName}
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
            {supplier?.supplierName}
          </Typography>
          {user?.role != "VIEWER" && !isSupplierPresent ? (
            <>
              <Button
                variant="contained"
                sx={{ mr: 0, mt: 2, height: 40, borderRadius: 32 }}
                size="medium"
                startIcon={<Plus />}
                onClick={() => setDialog(true)}
              >
                Add Supplier
              </Button>
              <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Select Contract Type</DialogTitle>
                <DialogContent>
                  <Stack
                    component="form"
                    sx={{ display: "flex", flexWrap: "wrap" }}
                    onSubmit={formik.handleSubmit}
                  >
                    <FormControl sx={{ m: 1, minWidth: 500 }}>
                      <InputLabel id="contractType-dialog-input-label-id">
                        Contract Type
                      </InputLabel>
                      <Select
                        required
                        labelId="contractType-dialog-select-label"
                        id="contractType-dialog-select-id"
                        value={formik.values.contractType}
                        onChange={(event) => {
                          formik.setFieldValue(
                            "contractType",
                            event.target.value
                          );
                        }}
                        input={<OutlinedInput label="Contract Type" />}
                      >
                        <MenuItem value="Direct">Direct</MenuItem>
                        <MenuItem value="Subcontracted">Subcontracted</MenuItem>
                      </Select>
                    </FormControl>
                    <DialogActions>
                      <Button
                        onClick={handleClose}
                        disabled={formik.isSubmitting}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={formik.isSubmitting}>
                        Add Supplier
                      </Button>
                    </DialogActions>
                  </Stack>
                </DialogContent>
              </Dialog>
            </>
          ) : null}
        </Box>

        {supplier && (
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              {/* Main Details Card */}
              <Grid item xs={12} md={4}>
                <Card elevation={2}>
                  <CardContent>
                    <Stack spacing={2}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="h6" fontWeight={600}>
                          Company Profile
                        </Typography>
                        <Chip
                          label={
                            mapContractType
                              ? mapContractType(supplier.contractType)
                              : supplier.contractType
                          }
                          color={
                            supplier.contractType === "Direct"
                              ? "primary"
                              : "secondary"
                          }
                        />
                      </Box>
                      <Divider />

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Building
                            size={24}
                            weight="fill"
                            color={blue[700]}
                            style={{ marginRight: 8 }}
                          />
                          <Typography>Years in Operation</Typography>
                        </Box>
                        <Typography fontWeight={500}>
                          {supplier.yearsOfOperation} years
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <CurrencyDollar
                            size={24}
                            weight="fill"
                            color={green[700]}
                            style={{ marginRight: 8 }}
                          />
                          <Typography>Annual Revenue</Typography>
                        </Box>
                        <Typography fontWeight={500}>
                          {supplier.revenue
                            ? supplier.revenue.toString()
                            : "N/A"}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <UsersThree
                            size={24}
                            weight="fill"
                            color={purple[700]}
                            style={{ marginRight: 8 }}
                          />
                          <Typography>Employees</Typography>
                        </Box>
                        <Typography fontWeight={500}>
                          {supplier.numberOfEmployees
                            ? supplier.numberOfEmployees.toString()
                            : "N/A"}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Handshake
                            size={24}
                            weight="fill"
                            color={blue[700]}
                            style={{ marginRight: 8 }}
                          />
                          <Typography>Work Status</Typography>
                        </Box>
                        <StatusChip
                          label={mapWorkStatus(supplier.workStatus)}
                          bgcolor={
                            mapWorkStatus(supplier.workStatus) ===
                            IWorkStatus.APPROVED
                              ? green[100]
                              : red[100]
                          }
                          borderColor={
                            mapWorkStatus(supplier.workStatus) ===
                            IWorkStatus.APPROVED
                              ? green[200]
                              : red[200]
                          }
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <ClipboardText
                            size={24}
                            weight="fill"
                            color={blue[700]}
                            style={{ marginRight: 8 }}
                          />
                          <Typography>Requirements Status</Typography>
                        </Box>
                        <StatusChip
                          label={mappedRequirementsStatus(
                            supplier.requirementsStatus
                          )}
                          bgcolor={
                            mappedRequirementsStatus(
                              supplier.requirementsStatus
                            ) === IRequirementsStatus.REQUIREMENTS_SUBMITTED
                              ? blue[100]
                              : purple[100]
                          }
                          borderColor={
                            mappedRequirementsStatus(
                              supplier.requirementsStatus
                            ) === IRequirementsStatus.REQUIREMENTS_SUBMITTED
                              ? blue[200]
                              : purple[200]
                          }
                        />
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              {/* Services & States Card */}
              <Grid item xs={12} md={4}>
                <Card elevation={2}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Services & Coverage
                    </Typography>
                    <Divider sx={{ mb: 2 }} />

                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      sx={{ display: "flex", alignItems: "center", mb: 1 }}
                    >
                      <Handshake
                        size={20}
                        weight="fill"
                        style={{ marginRight: 8 }}
                      />
                      Services Offered
                    </Typography>
                    <Box sx={{ mb: 3 }}>
                      {supplier.services && supplier.services.length > 0 ? (
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                          {supplier.services.map((service, index) => (
                            <Chip key={index} label={service} size="small" />
                          ))}
                        </Box>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No services listed
                        </Typography>
                      )}
                    </Box>

                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      sx={{ display: "flex", alignItems: "center", mb: 1 }}
                    >
                      <MapPin
                        size={20}
                        weight="fill"
                        style={{ marginRight: 8 }}
                      />
                      Service Areas
                    </Typography>
                    <Box>
                      {supplier.states && supplier.states.length > 0 ? (
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                          {supplier.states.map((state, index) => (
                            <Chip
                              key={index}
                              label={state}
                              size="small"
                              variant="outlined"
                            />
                          ))}
                        </Box>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No states listed
                        </Typography>
                      )}
                    </Box>

                    {supplier.businessClassifications &&
                      supplier.businessClassifications.length > 0 && (
                        <>
                          <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mt: 3,
                              mb: 1,
                            }}
                          >
                            <Certificate
                              size={20}
                              weight="fill"
                              style={{ marginRight: 8 }}
                            />
                            Business Classifications
                          </Typography>
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}
                          >
                            {supplier.businessClassifications.map(
                              (classification, index) => (
                                <Chip
                                  key={index}
                                  label={classification}
                                  size="small"
                                  color="info"
                                  variant="outlined"
                                />
                              )
                            )}
                          </Box>
                        </>
                      )}
                  </CardContent>
                </Card>
              </Grid>

              {/* Safety & Compliance Card */}
              <Grid item xs={12} md={4}>
                <Card elevation={2}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Safety & Compliance
                    </Typography>
                    <Divider sx={{ mb: 2 }} />

                    {supplier.safetyAndCompliance ? (
                      <List disablePadding>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <Shield size={24} weight="fill" color={red[600]} />
                          </ListItemIcon>
                          <ListItemText
                            primary="TRIR (Total Recordable Incident Rate)"
                            secondary={supplier.safetyAndCompliance.trir}
                          />
                        </ListItem>

                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <ChartBar
                              size={24}
                              weight="fill"
                              color={blue[600]}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary="EMR (Experience Modification Rate)"
                            secondary={supplier.safetyAndCompliance.emr}
                          />
                        </ListItem>

                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <FileText
                              size={24}
                              weight="fill"
                              color={green[600]}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary="Certificate of Insurance (COI)"
                            secondary={
                              supplier.safetyAndCompliance.coi || "Not provided"
                            }
                          />
                        </ListItem>

                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <ClipboardText
                              size={24}
                              weight="fill"
                              color={purple[600]}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary="Safety Program"
                            secondary={
                              supplier.safetyAndCompliance.safetyProgram ||
                              "Not provided"
                            }
                          />
                        </ListItem>

                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <ClipboardText
                              size={24}
                              weight="fill"
                              color={orange[600]}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary="OSHA Logs"
                            secondary={
                              supplier.safetyAndCompliance.oshaLogs ||
                              "Not provided"
                            }
                          />
                        </ListItem>

                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <Bank size={24} weight="fill" color={blue[800]} />
                          </ListItemIcon>
                          <ListItemText
                            primary="Banking Information"
                            secondary={
                              supplier.safetyAndCompliance.bankInfo ||
                              "Not provided"
                            }
                          />
                        </ListItem>
                      </List>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No safety and compliance information available
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}
      </Stack>
    </>
  );
};
