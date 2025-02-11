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
import { SitemarkIcon } from "@/components/CustomIcons/CustomIcons";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { object, string } from "yup";
import { signup } from "@/apis/authService";
import axios from "axios";
import Image from "next/image";

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
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function SignUp(props: { disableCustomTheme?: boolean }) {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      businessType: "CLIENT",
    },
    validationSchema: object({
      email: string().email("Invalid email address").required("Required"),
      password: string()
        .min(6, "Password must be at least 6 characters long")
        .required("Required"),
      name: string().required("Required"),
      businessType: string().required("Required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await signup(values);

        // Redirect on successful signup
        router.push(`/onboarding?businessType=${values.businessType}`);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.data?.errors) {
            setErrors(error.response.data.errors);
          } else {
            console.error("Signup failed:", error.message);
          }
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Link href="/">
            <Image
              src="zenflouu-logo.svg"
              alt="zenflouu-logo"
              width={150}
              height={50}
            />
          </Link>
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign up as{" "}
            {formik.values.businessType === "CLIENT" ? "Client" : "Supplier"}
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl component="fieldset">
              <FormLabel component="legend">Account Type</FormLabel>
              <ToggleButtonGroup
                color="primary"
                value={formik.values.businessType}
                exclusive
                onChange={(_, newValue) => {
                  if (newValue) {
                    formik.setFieldValue("businessType", newValue);
                  }
                }}
                aria-label="business-type-toggle-button"
              >
                <ToggleButton value="CLIENT">Client</ToggleButton>
                <ToggleButton value="SUPPLIER">Supplier</ToggleButton>
              </ToggleButtonGroup>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="name">Full name</FormLabel>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                placeholder="Jon Snow"
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                color={
                  formik.touched.name && Boolean(formik.errors.name)
                    ? "error"
                    : "primary"
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                color={
                  formik.touched.email && Boolean(formik.errors.email)
                    ? "error"
                    : "primary"
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                color={
                  formik.touched.password && Boolean(formik.errors.password)
                    ? "error"
                    : "primary"
                }
              />
            </FormControl>

            <Button type="submit" fullWidth variant="contained">
              Sign up as
              {formik.values.businessType === "CLIENT" ? "Client" : "Supplier"}
            </Button>
          </Box>
          <Box>
            <Typography variant="body2" align="center">
              Already have an account?{" "}
              <Link href="/sign-in" underline="hover">
                Log in
              </Link>
            </Typography>
            <Typography variant="body2" align="center">
              <Link href="/forgot-password" underline="hover">
                Forgot Password?
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </>
  );
}
