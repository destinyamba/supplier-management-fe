"use client";
import { getSupplierById } from "@/apis/suppliersService";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Paper,
  Tooltip,
  LinearProgress,
  Chip,
  Link,
  Stack,
} from "@mui/material";
import { blue, green, grey, red } from "@mui/material/colors";
import {
  CheckCircle,
  Cursor,
  MagnifyingGlass,
  SealCheck,
  Shield,
  Warning,
} from "@phosphor-icons/react";
import React, { useEffect } from "react";

export const Compliance: React.FC = () => {
  const [supplier, setSupplier] = React.useState<any>();
  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await getSupplierById();
        setSupplier(response.data);
      } catch (error) {
        console.error("Error fetching supplier:", error);
      }
    };

    fetchSupplier();
  }, []);

  if (!supplier) {
    return <Typography>Loading...</Typography>;
  }
  const requiredDocuments = ["COI", "BANK_INFO", "OSHA_LOG"];
  return (
    <>
      <Typography variant="h4" fontWeight={600} m={2}>
        Compliance
      </Typography>
      <Card
        sx={{ mb: 4, maxWidth: 600, mx: "auto", borderRadius: 2, boxShadow: 3 }}
      >
        <CardContent>
          {/* Section Header */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Shield size={32} color={blue[700]} />
            <Typography variant="h6" ml={1} fontWeight={600}>
              Safety & Compliance
            </Typography>
          </Box>

          {/* Safety Metrics */}
          <Paper
            variant="outlined"
            sx={{
              bgcolor: grey[50],
              p: 2,
              borderRadius: 2,
              mb: 2,
            }}
          >
            <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
              Safety Performance Metrics
            </Typography>

            <SafetyScore
              value={supplier.safetyAndCompliance.trir}
              label="TRIR (Total Recordable Incident Rate)"
              tooltipText="Lower values indicate better safety performance. Industry average is ~3.0"
            />

            <SafetyScore
              value={supplier.safetyAndCompliance.emr}
              label="EMR (Experience Modification Rate)"
              tooltipText="Values below 1.0 indicate better-than-average safety performance"
            />
          </Paper>

          {/* Compliance Documents */}
          <Paper
            variant="outlined"
            sx={{
              bgcolor: grey[50],
              p: 2,
              borderRadius: 2,
            }}
          >
            <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
              Compliance Documentation
            </Typography>

            {requiredDocuments.map((docKey) => {
              // Get submission status (false if not found)
              const isSubmitted = Boolean(
                supplier.safetyAndCompliance.submittedDocuments?.[docKey]
              );

              // Get validation status (false if not found)
              const isValidated = Boolean(
                supplier.safetyAndCompliance.validatedDocuments?.[docKey]
              );

              // Get URL based on document type
              let documentUrl = null;
              if (docKey === "OSHA_LOG") {
                documentUrl = supplier.safetyAndCompliance.oshaLogsUrl;
              } else if (docKey === "BANK_INFO") {
                documentUrl = supplier.safetyAndCompliance.bankInfoUrl;
              } else if (docKey === "COI") {
                documentUrl = supplier.safetyAndCompliance.coiUrl;
              }

              return (
                <DocumentStatus
                  key={docKey}
                  label={docKey}
                  submitted={isSubmitted}
                  validated={isValidated}
                  url={documentUrl}
                />
              );
            })}

            {requiredDocuments.length === 0 && (
              <Typography
                variant="body2"
                color={grey[600]}
                align="center"
                sx={{ py: 2 }}
              >
                No compliance documents required
              </Typography>
            )}
          </Paper>
        </CardContent>
      </Card>
    </>
  );
};

interface SafetyScoreProps {
  value: number;
  label: string;
  tooltipText: string;
}

const SafetyScore: React.FC<SafetyScoreProps> = ({
  value,
  label,
  tooltipText,
}) => {
  const getScoreColor = (score: number): string => {
    if (score <= 0.5) return green[500];
    if (score <= 1.0) return blue[500];
    return red[500];
  };

  // Calculate percentage for progress bar (inverse since lower is better)
  // TRIR usually ranges from 0-10, EMR from 0-2
  const getPercentage = (score: number, isEMR: boolean = false): number => {
    const maxValue = isEMR ? 2 : 10;
    // Invert the percentage since lower is better
    return 100 - (Math.min(score, maxValue) / maxValue) * 100;
  };

  const color = getScoreColor(value);
  const percentage = getPercentage(value, label === "EMR");

  return (
    <Tooltip title={tooltipText} arrow placement="top">
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
          <Typography variant="body2" fontWeight="bold" color={color}>
            {value.toFixed(2)}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={percentage}
          sx={{
            height: 8,
            borderRadius: 4,
            bgcolor: grey[200],
            "& .MuiLinearProgress-bar": {
              bgcolor: color,
            },
          }}
        />
      </Box>
    </Tooltip>
  );
};

interface DocumentStatusProps {
  label: string;
  submitted: boolean;
  validated: boolean;
  url: string | null;
}

const DocumentStatus: React.FC<DocumentStatusProps> = ({
  label,
  submitted,
  validated,
  url,
}) => {
  const formatLabel = (str: string): string => {
    return str
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 1.5,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <MagnifyingGlass size={16} color={grey[600]} />
        <Typography variant="body2">{formatLabel(label)}</Typography>
      </Box>
      <Stack direction="row" spacing={1} alignItems="center">
        <Tooltip
          title={submitted ? "Document Submitted" : "Document Not Submitted"}
          arrow
        >
          <Chip
            icon={
              submitted ? (
                <CheckCircle style={{ fontSize: "0.8rem" }} />
              ) : (
                <Warning style={{ fontSize: "0.8rem" }} />
              )
            }
            label={submitted ? "Submitted" : "Missing"}
            size="small"
            sx={{
              bgcolor: submitted ? green[100] : red[100],
              border: `1px solid ${submitted ? green[200] : red[200]}`,
              color: submitted ? green[800] : red[800],
              fontSize: "0.65rem",
              height: "20px",
              "& .MuiChip-icon": {
                color: submitted ? green[600] : red[600],
                marginLeft: 0.5,
              },
            }}
          />
        </Tooltip>

        <Tooltip
          title={validated ? "Document Validated" : "Document Not Validated"}
          arrow
        >
          <Chip
            icon={
              validated ? (
                <SealCheck style={{ fontSize: "0.8rem" }} />
              ) : (
                <Warning style={{ fontSize: "0.8rem" }} />
              )
            }
            label={validated ? "Validated" : "Not Validated"}
            size="small"
            sx={{
              bgcolor: validated ? blue[100] : grey[200],
              border: `1px solid ${validated ? blue[200] : grey[300]}`,
              color: validated ? blue[800] : grey[700],
              fontSize: "0.65rem",
              height: "20px",
              "& .MuiChip-icon": {
                color: validated ? blue[600] : grey[600],
                marginLeft: 0.5,
              },
            }}
          />
        </Tooltip>

        {url && (
          <Tooltip title="View Document" arrow>
            <Link
              href={url}
              target="_blank"
              rel="noopener"
              sx={{
                color: blue[600],
                display: "flex",
                "&:hover": {
                  color: blue[800],
                },
              }}
            >
              <Cursor size={16} />
            </Link>
          </Tooltip>
        )}
      </Stack>
    </Box>
  );
};
