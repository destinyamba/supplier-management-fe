"use client";
import { getUserDetails } from "@/apis/userManagementService";
import {
  cancelWorkOrder,
  getWorkOrder,
  updateWorkOrderStatus,
} from "@/apis/workOrdersService";
import { getStatusConfig, IWorkOrder, mapWorkOrderStatus, User } from "@/types";
import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid2,
  InputLabel,
  Link,
  MenuItem,
  OutlinedInput,
  Select,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { blue, red } from "@mui/material/colors";
import { Plus } from "@phosphor-icons/react";
import { useFormik } from "formik";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { StatusChip } from "xarton-1";
import * as Yup from "yup";

export const WorkOrderDetail = () => {
  const [workOrder, setWorkOrder] = useState<IWorkOrder | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [open, setDialog] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const params = useParams();
  const idParam = params?.id;
  const id = Array.isArray(idParam) ? idParam[0] : idParam;

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

  const formik = useFormik({
    initialValues: { status: "" },
    validationSchema: Yup.object({
      status: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        if (!id) return;
        await updateWorkOrderStatus(id, values.status);

        setSubmitting(false);
        handleClose();
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
        setSnackbarOpen(true);
        console.error(
          "Error updating work order status: Cannot update a completed work order.",
          error
        );
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <>
      <Grid2 container spacing={2}>
        <Grid2 container flexDirection="column" m={2}>
          <Snackbar
            open={snackbarOpen && error !== null}
            autoHideDuration={2000}
            onClose={() => setSnackbarOpen(false)}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={() => setSnackbarOpen(false)}
              severity="error"
              sx={{ width: "100%" }}
            >
              {error}
            </Alert>
          </Snackbar>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              href={user?.userType == "CLIENT" ? "/work-orders" : "/clients"}
            >
              {user?.userType == "CLIENT" ? "Work Orders" : "Clients"}
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
            {user?.userType == "CLIENT" ? (
              <>
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
              </>
            ) : (
              <>
                {" "}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {user?.role != "VIEWER" ? (
                    <>
                      <Button
                        sx={{
                          color: "black",
                          border: `1px solid ${blue[200]}`,
                          bgcolor: blue[100],
                          borderRadius: 32,
                          height: 24,
                          textTransform: "capitalize",
                          ml: 8,
                        }}
                        onClick={() => setDialog(true)}
                      >
                        Update Work Order Status
                      </Button>
                      <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Select Work Order Status</DialogTitle>
                        <DialogContent>
                          <Stack
                            component="form"
                            sx={{ display: "flex", flexWrap: "wrap" }}
                            onSubmit={formik.handleSubmit}
                          >
                            <FormControl sx={{ m: 1, minWidth: 500 }}>
                              <InputLabel id="status-dialog-input-label-id">
                                Work Order Status
                              </InputLabel>
                              <Select
                                required
                                labelId="status-dialog-select-label"
                                id="status-dialog-select-id"
                                value={formik.values.status}
                                onChange={(event) => {
                                  formik.setFieldValue(
                                    "status",
                                    event.target.value
                                  );
                                }}
                                input={
                                  <OutlinedInput label="Work Order Status" />
                                }
                              >
                                <MenuItem value="IN_PROGRESS">
                                  In Progress
                                </MenuItem>
                                <MenuItem value="COMPLETED">Completed</MenuItem>
                              </Select>
                            </FormControl>
                            <DialogActions>
                              <Button
                                onClick={handleClose}
                                disabled={formik.isSubmitting}
                              >
                                Cancel
                              </Button>
                              <Button
                                type="submit"
                                disabled={formik.isSubmitting}
                              >
                                Update Status
                              </Button>
                            </DialogActions>
                          </Stack>
                        </DialogContent>
                      </Dialog>
                    </>
                  ) : null}
                </Box>
              </>
            )}
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
