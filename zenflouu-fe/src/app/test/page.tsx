"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Link,
  MenuItem,
  Toolbar,
  Typography,
  CssBaseline,
  Card,
  TextField,
  Stack,
} from "@mui/material";
import { useRouter } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { SitemarkIcon } from "@/components/CustomIcons/CustomIcons";
import { CaretCircleDown } from "@phosphor-icons/react";

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
  const router = useRouter();

  const toggleDrawer = (newOpen: boolean) => () => setOpen(newOpen);

  return (
    <AppBar position="fixed" sx={{ bgcolor: "transparent", boxShadow: 0 }}>
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <SitemarkIcon />
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
              <Button onClick={() => router.push("/#features")}>
                Features
              </Button>
              <Button onClick={() => router.push("/#solutions")}>
                Solutions
              </Button>
              <Button onClick={() => router.push("/#pricing")}>Pricing</Button>
            </Box>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            <Button onClick={() => router.push("/login")}>Sign in</Button>
            <Button variant="contained" onClick={() => router.push("/signup")}>
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
            Transform Your Business with
            <Box component="span" color="primary.main">
              {" "}
              Zenflou
            </Box>
          </Typography>

          <Typography variant="h5" color="text.secondary">
            Intelligent workflow automation powered by AI
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button
              variant="contained"
              size="large"
              onClick={() => router.push("/signup")}
            >
              Start Free Trial
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => router.push("/demo")}
            >
              Request Demo
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
      title: "Smart Automation",
      description:
        "AI-powered workflow automation that learns and adapts to your business needs",
    },
    {
      title: "Real-time Analytics",
      description: "Comprehensive dashboards with real-time business insights",
    },
    {
      title: "Team Collaboration",
      description: "Seamless collaboration tools built for distributed teams",
    },
  ];

  return (
    <Box component="section" py={8} id="features">
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

export default function MarketingPage() {
  return (
    <>
      <CssBaseline />
      <AppAppBar />
      <main>
        <Hero />
        <Features />
        {/* Add other sections like Pricing, Testimonials, etc. */}
      </main>
      {/* Footer component would go here */}
    </>
  );
}
