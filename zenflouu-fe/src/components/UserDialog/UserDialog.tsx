import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { object, string } from "yup";

interface UserDialogProps {
  open: boolean;
  onClose: () => void;
  initialValues?: { name: string; email: string; role: string };
  onSubmit: (values: { name: string; email: string; role: string }) => void;
  title: string;
}
export const UserDialog: React.FC<UserDialogProps> = ({
  open,
  onClose,
  initialValues = { name: "", email: "", role: "" },
  onSubmit,
  title,
}: UserDialogProps) => {
  const [error, setError] = useState<string | null>(null);
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: object({
      name: string().required("Required"),
      email: string().email("Invalid email address").required("Required"),
      role: string().required("Required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        setSubmitting(true);
        setError(null);
        await onSubmit(values);
        onClose();
      } catch (error) {
        setError("Invalid credentials. Please try again.");
        if (axios.isAxiosError(error)) {
          setErrors({ email: "Email may already be in use or invalid." });
        }
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <>
      <Dialog fullWidth open={open} onClose={onClose} sx={{ m: 10 }}>
        <DialogTitle>
          <Typography variant="h5" fontWeight={600}>
            {title}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Stack component="form" onSubmit={formik.handleSubmit} gap={2}>
            <FormControl>
              <FormLabel htmlFor="name">Name</FormLabel>
              <TextField
                required
                fullWidth
                id="name"
                name="name"
                autoComplete="name"
                placeholder="Jon Snow"
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                placeholder="your@email.com"
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="email">Role</FormLabel>
              <Select
                id="role"
                name="role"
                value={formik.values.role}
                label="Role"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.role && Boolean(formik.errors.role)}
              >
                <MenuItem value="ADMIN">ADMIN</MenuItem>
                <MenuItem value="EDITOR">EDITOR</MenuItem>
                <MenuItem value="VIEWER">VIEWER</MenuItem>
              </Select>
            </FormControl>
            <Snackbar
              autoHideDuration={1000}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <Alert sx={{ width: "100%" }}>{error}</Alert>
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
                onClick={onClose}
                variant="contained"
                disabled={formik.isSubmitting}
              >
                Save
              </Button>
            </DialogActions>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};
