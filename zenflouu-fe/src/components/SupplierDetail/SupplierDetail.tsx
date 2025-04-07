"use client";
import { addSupplierToList, getClientSuppliers } from "@/apis/clientService";
import { getASupplier } from "@/apis/suppliersService";
import { getUserDetails } from "@/apis/userManagementService";
import {
  ISupplierCard,
  mapContractType,
  mappedRequirementsStatus,
  mapWorkStatus,
  User,
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
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import { Plus } from "@phosphor-icons/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { green, red, blue, grey } from "@mui/material/colors";
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
        <Stack
          spacing={1}
          direction="row"
          useFlexGap
          sx={{ flexWrap: "wrap", mt: 2 }}
        >
          <Box sx={{ p: 4 }}>
            {supplier && (
              <>
                <Card sx={{ mb: 4, borderRadius: 2, boxShadow: 3 }}>
                  <CardContent>
                    <Stack direction="row" spacing={2} mb={2}>
                      <StatusChip
                        label={mapWorkStatus(supplier.workStatus)}
                        bgcolor={
                          mapWorkStatus(supplier.workStatus) === "Approved"
                            ? green[100]
                            : red[100]
                        }
                        borderColor={
                          mapWorkStatus(supplier.workStatus) === "Approved"
                            ? green[200]
                            : red[200]
                        }
                      />
                      <StatusChip
                        label={mappedRequirementsStatus(
                          supplier.requirementsStatus
                        )}
                        bgcolor={
                          mappedRequirementsStatus(
                            supplier.requirementsStatus
                          ) === "Requirements Submitted"
                            ? blue[100]
                            : grey[100]
                        }
                        borderColor={
                          mappedRequirementsStatus(
                            supplier.requirementsStatus
                          ) === "Requirements Submitted"
                            ? blue[200]
                            : grey[200]
                        }
                      />
                    </Stack>
                    <Typography variant="body1" color={grey[700]}>
                      Contract Type: {mapContractType(supplier.contractType)}
                    </Typography>
                  </CardContent>
                </Card>

                <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
                  <Typography variant="h6" fontWeight={600} mb={2}>
                    Business Information
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Years of Operation"
                        secondary={supplier.yearsOfOperation}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Revenue"
                        secondary={supplier.revenue}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Number of Employees"
                        secondary={supplier.numberOfEmployees}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="States"
                        secondary={supplier.states.join(", ")}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Services"
                        secondary={supplier.services.join(", ")}
                      />
                    </ListItem>
                  </List>
                </Paper>

                <Paper sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="h6" fontWeight={600} mb={2}>
                    Safety and Compliance
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="TRIR (Total Recordable Incident Rate)"
                        secondary={supplier.safetyAndCompliance?.trir}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="EMR (Experience Modifier Rate)"
                        secondary={supplier.safetyAndCompliance?.emr}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="COI (Certificate of Insurance)"
                        secondary={
                          supplier.safetyAndCompliance?.coi || "Not Provided"
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Safety Program"
                        secondary={
                          supplier.safetyAndCompliance?.safetyProgram ||
                          "Not Provided"
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="OSHA Logs"
                        secondary={
                          supplier.safetyAndCompliance?.oshaLogs ||
                          "Not Provided"
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Bank Info"
                        secondary={
                          supplier.safetyAndCompliance?.bankInfo ||
                          "Not Provided"
                        }
                      />
                    </ListItem>
                  </List>
                </Paper>
              </>
            )}
          </Box>
        </Stack>
      </Stack>
    </>
  );
};
