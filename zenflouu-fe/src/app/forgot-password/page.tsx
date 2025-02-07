"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  CssBaseline,
  Stack,
  Card as MuiCard,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { passwordReset } from "@/apis/authService";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
}));

const ForgotPasswordContainer = styled(Stack)(({ theme }) => ({
  height: "100vh",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
}));

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // Step 1: Request reset, Step 2: Enter new password
  const [email, setEmail] = useState(""); // Store email for second step

  const formikStep1 = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await passwordReset({ email: values.email });
        setEmail(values.email);
        setStep(2);
      } catch (error) {
        setErrors({ email: "Email not found or error occurred." });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const formikStep2 = useFormik({
    initialValues: { token: "", newPassword: "" },
    validationSchema: Yup.object({
      token: Yup.string().required("Token is required"),
      newPassword: Yup.string()
        .min(6, "At least 6 characters")
        .required("Required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await passwordReset({
          email,
          token: values.token,
          password: values.newPassword,
        });
        alert("Password reset successful! You can now log in.");
      } catch (error) {
        setErrors({ token: "Invalid or expired token." });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <CssBaseline enableColorScheme />
      <ForgotPasswordContainer direction="column" justifyContent="center">
        <Card variant="outlined">
          <Typography component="h1" variant="h5" align="center">
            {step === 1 ? "Forgot Password?" : "Reset Your Password"}
          </Typography>

          {step === 1 ? (
            <Box
              component="form"
              onSubmit={formikStep1.handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <FormControl>
                <FormLabel>Email Address</FormLabel>
                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  value={formikStep1.values.email}
                  onChange={formikStep1.handleChange}
                  onBlur={formikStep1.handleBlur}
                  error={
                    formikStep1.touched.email &&
                    Boolean(formikStep1.errors.email)
                  }
                  helperText={
                    formikStep1.touched.email && formikStep1.errors.email
                  }
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={formikStep1.isSubmitting}
              >
                Send Reset Link
              </Button>
            </Box>
          ) : (
            <Box
              component="form"
              onSubmit={formikStep2.handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <FormControl>
                <FormLabel>Reset Token</FormLabel>
                <TextField
                  required
                  fullWidth
                  id="token"
                  name="token"
                  placeholder="Enter token from email"
                  value={formikStep2.values.token}
                  onChange={formikStep2.handleChange}
                  onBlur={formikStep2.handleBlur}
                  error={
                    formikStep2.touched.token &&
                    Boolean(formikStep2.errors.token)
                  }
                  helperText={
                    formikStep2.touched.token && formikStep2.errors.token
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>New Password</FormLabel>
                <TextField
                  required
                  fullWidth
                  name="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  value={formikStep2.values.newPassword}
                  onChange={formikStep2.handleChange}
                  onBlur={formikStep2.handleBlur}
                  error={
                    formikStep2.touched.newPassword &&
                    Boolean(formikStep2.errors.newPassword)
                  }
                  helperText={
                    formikStep2.touched.newPassword &&
                    formikStep2.errors.newPassword
                  }
                />
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={formikStep2.isSubmitting}
              >
                Reset Password
              </Button>
            </Box>
          )}
        </Card>
      </ForgotPasswordContainer>
    </>
  );
}
