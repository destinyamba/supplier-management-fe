"use client";

import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Typography,
  Grid2 as Grid,
  Box,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import {
  ArrowCircleRight,
  Building,
  CheckCircle,
  Cloud,
  Fingerprint,
  TestTube,
  UsersThree,
} from "@phosphor-icons/react";
import React, { createContext } from "react"; // Ensure createContext is imported from React
import { useRouter } from "next/navigation";

const features = [
  {
    icon: <UsersThree />,
    title: "Vendor Onboarding",
    description: "Streamlined supplier registration and verification process",
  },
  {
    icon: <TestTube />,
    title: "Performance Analytics",
    description: "Real-time supplier performance tracking and reporting",
  },
  {
    icon: <Cloud />,
    title: "Cloud-Based",
    description: "Access your supplier data from anywhere, anytime",
  },
  {
    icon: <Fingerprint />,
    title: "Advanced Security",
    description: "Enterprise-grade security for your sensitive data",
  },
];

const testimonials = [
  { metric: "500+", label: "Suppliers Managed" },
  { metric: "30%", label: "Cost Reduction" },
  { metric: "95%", label: "Client Satisfaction" },
  { metric: "24/7", label: "Support Available" },
];

const LandingPage: NextPage = () => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>ZenFlouu - Supplier Management System</title>
        <meta
          name="description"
          content="Next-gen supplier management platform for modern businesses"
        />
      </Head>

      {/* Navigation Bar */}
      <AppBar position="sticky" color="default" elevation={1}>
        <Container maxWidth="xl">
          <Toolbar>
            <Building />
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              ZenFlouu
            </Typography>
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
              <Button color="inherit">Features</Button>
              <Button color="inherit">Pricing</Button>
              <Button color="inherit">Contact</Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => router.push("/sign-up")}
              >
                Get Started
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Grid container alignItems="center" spacing={4}>
          <Grid size={{ md: 6, xs: 12 }}>
            <Typography variant="h2" gutterBottom>
              Streamline Your Supplier Management
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              Automate, optimize, and transform your supplier relationships with
              our all-in-one platform.
            </Typography>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowCircleRight />}
            >
              Start Free Trial
            </Button>
          </Grid>
          <Grid size={{ md: 6, xs: 12 }}>
            <Image
              src="/supply-chain.png"
              alt="Supplier Management"
              width={600}
              height={400}
              layout="responsive"
            />
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Box bgcolor="background.paper" py={8}>
        <Container maxWidth="xl">
          <Typography variant="h4" align="center" gutterBottom>
            Powerful Features
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {features.map((feature, index) => (
              <Grid size={{ md: 3, sm: 6, xs: 12 }} key={index}>
                <Paper elevation={0} sx={{ p: 3, height: "100%" }}>
                  <Box sx={{ color: "primary.main", fontSize: 40 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ md: 6, xs: 12 }}>
            <Typography variant="h4" gutterBottom>
              Why Choose SupplyChain Pro?
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon sx={{ color: "success.main" }}>
                  <CheckCircle />
                </ListItemIcon>
                <ListItemText primary="Centralized supplier database" />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ color: "success.main" }}>
                  <CheckCircle />
                </ListItemIcon>
                <ListItemText primary="Automated compliance monitoring" />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ color: "success.main" }}>
                  <CheckCircle />
                </ListItemIcon>
                <ListItemText primary="Real-time collaboration tools" />
              </ListItem>
            </List>
          </Grid>
          <Grid size={{ md: 6, xs: 12 }}>
            <Image
              src="/analytics-dashboard.png"
              alt="Analytics Dashboard"
              width={600}
              height={400}
              layout="responsive"
            />
          </Grid>
        </Grid>
      </Container>

      {/* Testimonials/Stats Section */}
      <Box bgcolor="primary.main" color="white" py={8}>
        <Container maxWidth="xl">
          <Grid container spacing={4} justifyContent="center">
            {testimonials.map((stat, index) => (
              <Grid size={{ sm: 3, xs: 6 }} key={index} textAlign="center">
                <Typography variant="h3" gutterBottom>
                  {stat.metric}
                </Typography>
                <Typography variant="subtitle1">{stat.label}</Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Ready to Transform Your Supply Chain?
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Join hundreds of companies already managing their suppliers
          efficiently
        </Typography>
        <Button variant="contained" size="large" sx={{ mt: 3 }}>
          Schedule a Demo
        </Button>
      </Container>

      {/* Footer */}
      <Box bgcolor="background.paper" py={4}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            <Grid size={{ md: 6, xs: 12 }}>
              <Typography variant="h6" gutterBottom>
                ZenFlouu
              </Typography>
              <Typography color="text.secondary">
                Empowering businesses with intelligent supplier management
                solutions
              </Typography>
            </Grid>
            <Grid size={{ md: 3, xs: 6 }}>
              <Typography variant="subtitle1" gutterBottom>
                Product
              </Typography>
              <List dense>
                <ListItem disableGutters>
                  <Link href="#" color="text.secondary">
                    Features
                  </Link>
                </ListItem>
                <ListItem disableGutters>
                  <Link href="#" color="text.secondary">
                    Pricing
                  </Link>
                </ListItem>
              </List>
            </Grid>
            <Grid size={{ md: 3, xs: 6 }}>
              <Typography variant="subtitle1" gutterBottom>
                Company
              </Typography>
              <List dense>
                <ListItem disableGutters>
                  <Link href="#" color="text.secondary">
                    About
                  </Link>
                </ListItem>
                <ListItem disableGutters>
                  <Link href="#" color="text.secondary">
                    Contact
                  </Link>
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <Typography align="center" color="text.secondary" sx={{ mt: 4 }}>
            © 2024 ZenFlouu. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default LandingPage;
