"use client";
import {
  createWorkOrder,
  listOfLocations,
  listOfServices,
} from "@/apis/workOrdersService";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { date, object, string } from "yup";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Region, Service } from "@/types";

interface CreateWorkOrderDialogProps {
  open: boolean;
  onClose: () => void;
}
export const CreateWorkOrderDialog = ({
  open,
  onClose,
}: CreateWorkOrderDialogProps) => {
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [locations, setLocations] = useState<Region[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  const fetchLocations = async () => {
    try {
      const response = await listOfLocations();
      const services = await listOfServices();
      setLocations(response.data);
      setServices(services.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      location: "",
      dueDate: dayjs(),
      startDate: dayjs(),
      taskDescription: "",
      service: "",
    },
    validationSchema: object({
      location: string().required("Required"),
      dueDate: date().required("Required"),
      startDate: date().required("Required"),
      taskDescription: string().required("Required"),
      service: string().required("Required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        setSubmitting(true);
        setError(null);
        await createWorkOrder({
          ...values,
          dueDate: values.dueDate.toDate().toISOString(),
          startDate: values.startDate.toDate().toISOString(),
        });
        onClose();
      } catch (error) {
        setSnackbarOpen(true);
        setError("Invalid work order request. Please try again.");
        if (axios.isAxiosError(error)) {
          setErrors(error.response?.data?.errors);
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    fetchLocations();
  }, [open]);

  return (
    <>
      <Dialog fullWidth open={open} onClose={onClose} sx={{ m: 10 }}>
        <DialogTitle>
          <Typography variant="h5" fontWeight={600}>
            Create Work Order
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Stack component="form" onSubmit={formik.handleSubmit} gap={2}>
            <FormControl>
              <FormLabel htmlFor="taskDescription">Task Description</FormLabel>
              <TextField
                required
                fullWidth
                id="taskDescription"
                name="taskDescription"
                placeholder="Deliver 4000 gallons of water to site."
                error={
                  formik.touched.taskDescription &&
                  Boolean(formik.errors.taskDescription)
                }
                helperText={
                  formik.touched.taskDescription &&
                  formik.errors.taskDescription
                }
                value={formik.values.taskDescription}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="startDate">Start Date</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={formik.values.startDate}
                  onChange={(newValue) => {
                    if (newValue && !newValue.isSame(formik.values.startDate)) {
                      formik.setFieldValue("startDate", newValue);
                    }
                  }}
                  minDate={dayjs()}
                />
              </LocalizationProvider>
            </FormControl>

            <FormControl>
              <FormLabel id="dueDate-label" htmlFor="dueDate">
                Due Date
              </FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={formik.values.dueDate}
                  onChange={(newValue) => {
                    if (newValue && !newValue.isSame(formik.values.dueDate)) {
                      formik.setFieldValue("dueDate", newValue);
                    }
                  }}
                  minDate={dayjs()}
                />
              </LocalizationProvider>
            </FormControl>

            <FormControl>
              <InputLabel id="location">Location</InputLabel>
              <Select
                labelId="location"
                id="location"
                value={formik.values.location}
                onChange={(event) => {
                  formik.setFieldValue("location", event.target.value);
                }}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.location && Boolean(formik.errors.location)
                }
              >
                {locations.map((location) => (
                  <MenuItem key={location.abbreviation} value={location.name}>
                    {location.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel id="service">Service</InputLabel>
              <Select
                labelId="service"
                id="service"
                value={formik.values.service}
                onChange={(event) => {
                  formik.setFieldValue("service", event.target.value);
                }}
                onBlur={formik.handleBlur}
                error={formik.touched.service && Boolean(formik.errors.service)}
              >
                {services.map((service) => (
                  <MenuItem key={service.name} value={service.name}>
                    {service.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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
            <DialogActions>
              {" "}
              <Button
                variant="outlined"
                onClick={onClose}
                disabled={formik.isSubmitting}
              >
                Close
              </Button>
              <Button
                type="submit"
                // onClick={onClose}
                variant="contained"
                disabled={formik.isSubmitting}
              >
                Create
              </Button>
            </DialogActions>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};
