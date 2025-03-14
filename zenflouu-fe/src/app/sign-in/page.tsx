"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { object, string } from "yup";
import { signin } from "@/apis/authService";
import axios from "axios";
import Image from "next/image";
import { Alert, Snackbar } from "@mui/material";
import { error } from "console";
import { useState } from "react";

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

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "100vh",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
}));

export default function SignIn() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      general: "",
    },
    validationSchema: object({
      email: string().email("Invalid email address").required("Required"),
      password: string().required("Required"),
      general: string(),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        setError(null);
        await signin(values);
        router.push("/dashboard");
      } catch (error) {
        setError("Invalid credentials. Please try again.");
        if (axios.isAxiosError(error)) {
          setErrors({ general: "Invalid credentials. Please try again." });
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <>
    <title>ZenFlouu | Sign In</title>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="center">
        <Snackbar
          open={!!error}
          autoHideDuration={4000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            severity="error"
            sx={{ width: "100%" }}
            onClose={handleCloseError}
          >
            {error}
          </Alert>
        </Snackbar>
        <Card variant="outlined">
          <Link href="/">
            <Image
              src="zenflouu-logo.svg"
              alt="zenflouu-logo"
              width={150}
              height={50}
            />
          </Link>

          <Typography component="h1" variant="h4" align="center">
            Sign In
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
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
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                placeholder="••••••"
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FormControl>

            {formik.errors.general && (
              <Typography color="error" variant="body2" align="center">
                {formik.errors.general}
              </Typography>
            )}

            <Button type="submit" fullWidth variant="contained">
              Sign In
            </Button>
          </Box>
          <Box>
            <Typography variant="body2" align="center">
              Don't have an account? <Link href="/sign-up">Sign Up</Link>
            </Typography>
            <Typography variant="body2" align="center">
              <Link href="/forgot-password">Forgot Password?</Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </>
  );
}
