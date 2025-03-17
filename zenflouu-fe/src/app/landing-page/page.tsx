"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
  CssBaseline,
  Card,
  Stack,
  Link,
  Grid2,
} from "@mui/material";
import { useRouter } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import { CaretCircleDown } from "@phosphor-icons/react";
import Image from "next/image";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.background.default,
  padding: "8px 12px",
}));

export function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const router = useRouter();

  const toggleDrawer = (newOpen: boolean) => () => setOpen(newOpen);

  React.useEffect(() => setMounted(true), []);

  return (
    <>
      {mounted && (
        <AppBar
          position="fixed"
          sx={{ bgcolor: "transparent", boxShadow: 0, mt: 2 }}
        >
          <Container maxWidth="lg">
            <StyledToolbar variant="dense" disableGutters>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Image
                  src="zenflouu-logo.svg"
                  alt="zenflouu-logo"
                  width={150}
                  height={50}
                />
                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                    gap: 1,
                  }}
                >
                  <Button onClick={() => router.push("/#problems")}>
                    Problem
                  </Button>
                  <Button onClick={() => router.push("/#features")}>
                    Features
                  </Button>
                  <Button onClick={() => router.push("/#solutions")}>
                    Solutions
                  </Button>
                </Box>
              </Box>

              <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
                <Button onClick={() => router.push("/sign-in")}>Sign in</Button>
                <Button
                  variant="contained"
                  onClick={() => router.push("/sign-up")}
                >
                  Get Started
                </Button>
                <CaretCircleDown />
              </Box>

              <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
                <CaretCircleDown />
                <IconButton onClick={toggleDrawer(true)}>
                  <MenuIcon />
                </IconButton>
              </Box>
            </StyledToolbar>
          </Container>
        </AppBar>
      )}
    </>
  );
}

const HeroSection = styled("section")(({ theme }) => ({
  position: "relative",
  paddingTop: theme.spacing(16),
  paddingBottom: theme.spacing(8),
  background: `linear-gradient(180deg, ${theme.palette.primary.light} 0%, ${theme.palette.background.default} 100%)`,
}));

export function Hero() {
  const router = useRouter();

  return (
    <HeroSection>
      <Container maxWidth="lg">
        <Stack spacing={4} textAlign="center" alignItems="center">
          <Typography
            variant="h1"
            sx={{ fontSize: "clamp(2rem, 10vw, 3.5rem)" }}
          >
            Discover and Contract Suppliers in Minutes with
            <Box component="span" color="primary.main">
              {" "}
              Zenflouu
            </Box>
          </Typography>

          <Typography variant="h5" color="text.secondary">
            Intelligent workflow automation powered by AI
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button
              variant="contained"
              size="large"
              onClick={() => router.push("/sign-up")}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => router.push("/sign-in")}
            >
              Sign In
            </Button>
          </Stack>
        </Stack>
      </Container>
    </HeroSection>
  );
}

const FeatureCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  background:
    theme.palette.mode === "dark"
      ? "linear-gradient(45deg, #1a1a1a, #2d2d2d)"
      : "linear-gradient(45deg, #f8f9fa, #ffffff)",
}));

export function Features() {
  const features = [
    {
      title: "Supplier Discovery",
      description:
        "A comprehensive database of suppliers to discover new partners. AI-powered recommendations to find the best suppliers for your business needs. Easily compare suppliers and their offerings. Filter by location, industry, business classifications and more",
    },
    {
      title: "Spend Management",
      description:
        "Comprehensive dashboards with real-time business insights. Data-driven decision-making for your procurement team to optimize spend and reduce costs by up to 30%. Analyze spend data by service, category, or supplier",
    },
    {
      title: "Automated Onboarding & Compliance",
      description:
        "Seamless indroduce new suppliers with new or existing compliance to your approved supplier list. Artificial intelligence (AI) and automation to streamline the process of integrating new suppliers into your organization",
    },
  ];

  return (
    <Box component="section" py={12} id="features">
      <Container maxWidth="lg">
        <Typography variant="h2" textAlign="center" mb={6}>
          Powerful Features
        </Typography>

        <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <Typography variant="h5" gutterBottom>
                {feature.title}
              </Typography>
              <Typography color="text.secondary">
                {feature.description}
              </Typography>
            </FeatureCard>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
export function Problem() {
  const problems = [
    {
      title: "Length Compliance Checks",
      description:
        "Supplier onboarding can take weeks or even months to complete if done manually. This delays the ability to start doing business. Important steps like background checks and document collection can be missed without structured workflows. It presents compliance and audit risks",
    },
    {
      title: "Lack of Transparency",
      description:
        "Inconsistent data stored across multiple systems and documents is yet another pain point. For example, the proof of address contains different supplier data than what was collected during onboarding. Analysis and forecasting inaccuracies if reporting is based on inconsistent underlying data",
    },
    {
      title: "Time Consuming Onboarding",
      description:
        "Supplier onboarding is often a time-consuming process that can take months from start to finish. An industry average of 30 days with suppliers clients have relationships with. It delays the time to value and poses a major challenge for procurement teams looking to rapidly onboard new suppliers",
    },
  ];
  return (
    <Box component="section" py={12} id="problems">
      <Container maxWidth="lg">
        <Typography variant="h2" textAlign="center" mb={6}>
          Supply Chain and Procurement Problems
        </Typography>

        <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
          {problems.map((problem, index) => (
            <FeatureCard key={index}>
              <Typography variant="h5" gutterBottom>
                {problem.title}
              </Typography>
              <Typography color="text.secondary">
                {problem.description}
              </Typography>
            </FeatureCard>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
export function Solution() {
  const solutions = [
    {
      title: "Automated Onboarding",
      description:
        "Suppliers register, record, and update their details in a single portal; you gain control and visibility into all your supplier data",
    },
    {
      title: "Sourcing Automation",
      description:
        "Select suppliers from a vetted pool; with up-to-date and relevant compliance documents",
    },
    {
      title: "Analytics and Reporting",
      description:
        "Get full transparency into spend with interactive dashboards and reports, so you can stay ahead of costs, predict cashflow and increase the accuracy of forecasts and budgets",
    },
  ];
  return (
    <Box component="section" py={12} id="solutions">
      <Container maxWidth="lg">
        <Typography variant="h2" textAlign="center" mb={6}>
          ZenFlouu Solutions
        </Typography>
        <Grid2
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {solutions.map((solution, index) => (
            <Grid2
              key={index}
              size={{ xs: 2, sm: 4, md: 4 }}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <FeatureCard>
                <Typography variant="h5" gutterBottom>
                  {solution.title}
                </Typography>
                <Typography color="text.secondary">
                  {solution.description}
                </Typography>
              </FeatureCard>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Box>
  );
}
function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
      {"Copyright © "}
      <Link color="text.secondary">ZenFlouu</Link>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

export function Footer() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: "center", md: "left" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            minWidth: { xs: "100%", sm: "60%" },
          }}
        >
          <Box sx={{ width: { xs: "100%", sm: "60%" } }}>
            <Image
              src="zenflouu-logo.svg"
              alt="zenflouu-logo"
              width={150}
              height={50}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: "medium" }}>
            Legal
          </Typography>
          <Link color="text.secondary" variant="body2" href="/">
            Terms
          </Link>
          <Link color="text.secondary" variant="body2" href="/">
            Privacy
          </Link>
          <Link color="text.secondary" variant="body2" href="/">
            Contact
          </Link>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pt: { xs: 4, sm: 8 },
          width: "100%",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <div>
          <Link color="text.secondary" variant="body2" href="/">
            Privacy Policy
          </Link>
          <Typography sx={{ display: "inline", mx: 0.5, opacity: 0.5 }}>
            &nbsp;•&nbsp;
          </Typography>
          <Link color="text.secondary" variant="body2" href="/">
            Terms of Service
          </Link>
          <Copyright />
        </div>
      </Box>
    </Container>
  );
}

export default function MarketingPage() {
  return (
    <>
      <title>ZenFlouu | Home</title>
      <CssBaseline />
      <AppAppBar />
      <main>
        <Hero />
        <Problem />
        <Features />
        <Solution />
      </main>
      <Footer />
    </>
  );
}
