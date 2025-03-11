import {
  Alert,
  Box,
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
}
export const UserDialog: React.FC<UserDialogProps> = ({
  open,
  onClose,
}: UserDialogProps) => {
  const [state, setState] = useState({
    openSnackbar: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, openSnackbar } = state;

  const [error, setError] = useState<string | null>(null);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
    validationSchema: object({
      name: string().required("Required"),
      email: string().email("Invalid email address").required("Required"),
      password: string().required("Required"),
      general: string(),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        setError(null);
        // await signin(values);
        // router.push("/dashboard");
      } catch (error) {
        setError("Invalid credentials. Please try again.");
        if (axios.isAxiosError(error)) {
          setErrors({ role: "Invalid credentials (role). Please try again." });
        }
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <>
      <Dialog fullWidth open={open} onClose={onClose} sx={{ p: 18 }}>
        <DialogTitle>
          <Typography variant="h5" fontWeight={600}>
            Invite a user to Organisation
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box>
            <Snackbar
              autoHideDuration={4000}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              open={openSnackbar}
              onClose={onClose}
              message="Oops! Something went wrong."
              key={vertical + horizontal}
            >
              <Alert severity="error" sx={{ width: "100%" }}>
                {error}
              </Alert>
            </Snackbar>
          </Box>
          <Stack>
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
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
          <Button onClick={onClose}>Send</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
