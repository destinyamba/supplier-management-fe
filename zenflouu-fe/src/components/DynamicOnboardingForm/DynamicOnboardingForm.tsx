"use client";
import React from "react";
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import {
  CheckCircle as CheckCircleIcon,
  CloudArrowUp as CloudArrowUpIcon,
} from "@phosphor-icons/react";
import {
  supplyChainServices,
  StatusChip,
  ukStates,
  IEmployees,
  IRevenue,
  IBusinessClassification,
  BusinessType,
} from "xarton-1";
import { onboardSupplier } from "@/apis/supplierOnboardingService";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

const FileUploadStep = ({ formData, handleChange }: any) => {
  const uploadFields = [
    { label: "COI (Certificate of Insurance)", key: "coi" },
    { label: "OSHA Logs", key: "oshaLogs" },
    { label: "Safety Program", key: "safetyProgram" },
    { label: "Bank Information", key: "bankInfo" },
  ];

  return (
    <Box sx={{ display: "grid", gap: 3 }}>
      {uploadFields.map((field) => (
        <Box key={field.key}>
          <input
            accept=".pdf,.doc,.docx,.xls,.xlsx"
            type="file"
            onChange={(e) =>
              handleChange(`files.${field.key}`, e.target.files?.[0] || null)
            }
            hidden
            id={`${field.key}-upload`}
          />
          <label htmlFor={`${field.key}-upload`}>
            <Button
              variant="outlined"
              component="span"
              startIcon={<CloudArrowUpIcon />}
              fullWidth
              sx={{
                p: 3,
                borderStyle: "dashed",
                borderWidth: 2,
                bgcolor: formData?.files?.[field.key]
                  ? blue[50]
                  : "transparent",
              }}
            >
              <Box sx={{ textAlign: "left" }}>
                <Typography variant="subtitle1">{field.label}</Typography>
                <Typography variant="caption" color="textSecondary">
                  {formData?.files?.[field.key]?.name ??
                    "Click to upload or drag and drop"}
                </Typography>
              </Box>
            </Button>
          </label>
          {formData?.files?.[field.key] && (
            <Box sx={{ display: "flex", alignItems: "center", mt: 1, gap: 1 }}>
              <CheckCircleIcon color="success" fontSize="small" />
              <Typography variant="caption" color="textSecondary">
                {formData.files[field.key].name} uploaded
              </Typography>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};
const clientSteps = [
  {
    label: "Client Details",
    component: ({ formData, handleChange }: any) => (
      <Box>
        <TextField
          label="Client Name"
          value={formData.clientName || ""}
          onChange={(e) => handleChange("clientName", e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Years of Operation"
          type="number"
          value={formData.yearsOfOperation || ""}
          onChange={(e) =>
            handleChange("yearsOfOperation", Number(e.target.value))
          }
          fullWidth
          margin="normal"
        />
      </Box>
    ),
  },
  {
    label: "Primary Contact",
    component: ({ formData, handleChange }: any) => (
      <Box>
        <TextField
          label="Primary Contact Name"
          value={formData.primaryContactName || ""}
          onChange={(e) => handleChange("primaryContactName", e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Primary Contact Email"
          value={formData.primaryContactEmail || ""}
          onChange={(e) => handleChange("primaryContactEmail", e.target.value)}
          fullWidth
          margin="normal"
        />
      </Box>
    ),
  },
  {
    label: "Secondary Contact (Optional)",
    component: ({ formData, handleChange }: any) => (
      <Box>
        <TextField
          label="Secondary Contact Name"
          value={formData.secondaryContactName || ""}
          onChange={(e) => handleChange("secondaryContactName", e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Secondary Contact Email"
          value={formData.secondaryContactEmail || ""}
          onChange={(e) =>
            handleChange("secondaryContactEmail", e.target.value)
          }
          fullWidth
          margin="normal"
        />
      </Box>
    ),
  },
];

const supplierSteps = [
  {
    label: "Supplier Details",
    component: ({ formData, handleChange, touched, errors }: any) => (
      <Box>
        <TextField
          label="Supplier Name"
          value={formData.supplierName}
          onChange={(e: any) => handleChange("supplierName", e.target.value)}
          fullWidth
          helperText={touched?.supplierName && errors?.supplierName}
          error={touched?.supplierName && Boolean(errors?.supplierName)}
        />
        <Box mt={2}>
          <Typography variant="caption" fontWeight={600} color={grey[800]}>
            Contact Info
          </Typography>
        </Box>
        <TextField
          sx={{ mb: 2 }}
          label="Primary Contact Name"
          value={formData.contactInfo.primaryContact.primaryContactName}
          onChange={(e: any) =>
            handleChange(
              "contactInfo.primaryContact.primaryContactName",
              e.target.value
            )
          }
          fullWidth
        />
        <TextField
          sx={{ mb: 2 }}
          disabled
          label="Primary Contact Email"
          value={formData.contactInfo.primaryContact.primaryContactEmail}
          onChange={(e: any) =>
            handleChange(
              "contactInfo.primaryContact.primaryContactEmail",
              e.target.value
            )
          }
          fullWidth
        />
        <TextField
          sx={{ mb: 2 }}
          label="Secondary Contact Name"
          value={formData.contactInfo.secondaryContact.secondaryContactName}
          onChange={(e: any) =>
            handleChange(
              "contactInfo.secondaryContact.secondaryContactName",
              e.target.value
            )
          }
          fullWidth
        />
        <TextField
          label="Secondary Contact Email"
          value={formData.contactInfo.secondaryContact.secondaryContactEmail}
          onChange={(e: any) =>
            handleChange(
              "contactInfo.secondaryContact.secondaryContactEmail",
              e.target.value
            )
          }
          fullWidth
        />
        <Box mt={2}>
          <Typography variant="caption" fontWeight={600} color={grey[800]}>
            Select Services (UK)
          </Typography>
        </Box>

        <Box
          sx={{
            gap: 0.5,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {supplyChainServices.map((service) => (
            <StatusChip
              size="medium"
              key={service.name}
              label={service.name}
              bgcolor={
                formData.services?.includes(service.name) ? blue[50] : "white"
              }
              borderColor={
                formData.services?.includes(service.name) ? blue[500] : "grey"
              }
              onClick={() => {
                formData.services?.includes(service.name);
                const updatedServices = formData.services?.includes(
                  service.name
                )
                  ? formData.services.filter(
                      (code: string) => code !== service.name
                    )
                  : [...(formData.services || []), service.name];
                handleChange("services", updatedServices);
              }}
            />
          ))}
        </Box>
      </Box>
    ),
  },
  {
    label: "Operational Details",
    component: ({ formData, handleChange }: any) => (
      <Box>
        <Box mt={2}>
          <Typography variant="caption" fontWeight={600} color={grey[800]}>
            Select States (UK)
          </Typography>
        </Box>

        <Box>
          {ukStates.map((state) => (
            <StatusChip
              size="medium"
              key={state.name}
              label={state.name}
              bgcolor={
                formData.states?.includes(state.code) ? blue[50] : "white"
              }
              borderColor={
                formData.states?.includes(state.code) ? blue[500] : "grey"
              }
              onClick={() => {
                const updatedStates = formData.states?.includes(state.code)
                  ? formData.states.filter(
                      (code: string) => code !== state.code
                    )
                  : [...(formData.states || []), state.code];
                handleChange("states", updatedStates);
              }}
            />
          ))}
        </Box>

        <Box mt={2}>
          <Typography variant="caption" fontWeight={600} color={grey[800]}>
            Select Number of Employees
          </Typography>
        </Box>

        <Box>
          {Object.values(IEmployees).map((range) => (
            <StatusChip
              size="medium"
              key={range}
              label={range}
              bgcolor={
                formData.numberOfEmployees === range ? blue[50] : "white"
              }
              borderColor={
                formData.numberOfEmployees === range ? blue[500] : "grey"
              }
              onClick={() => handleChange("numberOfEmployees", range)}
            />
          ))}
        </Box>

        <Box mt={2}>
          <Typography variant="caption" fontWeight={600} color={grey[800]}>
            Select Annual Revenue
          </Typography>
        </Box>

        <Box
          sx={{ gap: 0.5, display: "flex", direction: "row", flexWrap: "wrap" }}
        >
          {Object.values(IRevenue).map((revenue) => (
            <StatusChip
              size="medium"
              key={revenue}
              label={revenue}
              bgcolor={formData.revenue === revenue ? blue[50] : "white"}
              borderColor={formData.revenue === revenue ? blue[500] : "grey"}
              onClick={() => handleChange("revenue", revenue)}
            />
          ))}
        </Box>

        <Box mt={2}>
          <Typography variant="caption" fontWeight={600} color={grey[800]}>
            Years of Operation
          </Typography>
        </Box>

        <Box
          sx={{ gap: 0.5, display: "flex", direction: "row", flexWrap: "wrap" }}
        >
          <TextField
            value={formData.yearsOfOperation}
            onChange={(e: any) =>
              handleChange("yearsOfOperation", e.target.value)
            }
            fullWidth
          />
        </Box>
      </Box>
    ),
  },
  {
    label: "Business Classifications",
    component: ({ formData, handleChange }: any) => (
      <Box
        sx={{ gap: 0.5, display: "flex", direction: "row", flexWrap: "wrap" }}
      >
        {Object.keys(IBusinessClassification).map((classification) => (
          <StatusChip
            size="medium"
            key={classification}
            label={classification}
            bgcolor={
              formData.businessClassifications?.[classification]
                ? blue[50]
                : "white"
            }
            borderColor={
              formData.businessClassifications?.[classification]
                ? blue[500]
                : "grey"
            }
            onClick={() => {
              handleChange("businessClassifications", {
                ...formData.businessClassifications,
                [classification]:
                  !formData.businessClassifications?.[classification],
              });
            }}
          />
        ))}
      </Box>
    ),
  },
  {
    label: "Safety and Compliance",
    component: ({ formData, handleChange, touched, errors }: any) => (
      <Box>
        <TextField
          sx={{ mb: 2 }}
          label="TRIR (Safety Metric)"
          type="number"
          value={formData.safetyAndCompliance?.trir || ""}
          onChange={(e: any) =>
            handleChange("safetyAndCompliance", {
              ...formData.safetyAndCompliance,
              trir: Number(e.target.value),
            })
          }
          fullWidth
          helperText={
            touched?.safetyAndCompliance?.trir &&
            errors?.safetyAndCompliance?.trir
          }
          error={
            touched?.safetyAndCompliance?.trir &&
            Boolean(errors?.safetyAndCompliance?.trir)
          }
        />
        <TextField
          label="EMR (Experience Modifier Rate)"
          type="number"
          value={formData.safetyAndCompliance?.emr || ""}
          onChange={(e: any) =>
            handleChange("safetyAndCompliance", {
              ...formData.safetyAndCompliance,
              emr: Number(e.target.value),
            })
          }
          fullWidth
          helperText={
            touched?.safetyAndCompliance?.emr &&
            errors?.safetyAndCompliance?.emr
          }
          error={
            touched?.safetyAndCompliance?.emr &&
            Boolean(errors?.safetyAndCompliance?.emr)
          }
        />
      </Box>
    ),
  },
  {
    label: "File Uploads",
    component: ({ formData, handleChange }: any) => (
      <FileUploadStep formData={formData} handleChange={handleChange} />
    ),
  },
];

interface IDynamicOnboardingForm {
  name: string;
  email: string;
  handleSubmit?: () => void;
  businessType: BusinessType.CLIENT | BusinessType.SUPPLIER;
}

const DynamicOnboardingForm: React.FC<IDynamicOnboardingForm> = ({
  name,
  email,
  businessType,
}) => {
  const router = useRouter();
  const steps =
    businessType === BusinessType.CLIENT ? clientSteps : supplierSteps;
  const formik = useFormik({
    initialValues: {
      supplierName: "",
      services: [] as string[],
      states: [] as string[],
      yearsOfOperation: 0,
      revenue: "",
      numberOfEmployees: "",
      contactInfo: {
        primaryContact: {
          primaryContactName: name,
          primaryContactEmail: email,
        },
        secondaryContact: {
          secondaryContactName: "",
          secondaryContactEmail: "",
        },
      },
      businessClassifications: {} as IBusinessClassification,
      safetyAndCompliance: {
        trir: 0,
        emr: 0,
      },
      files: {
        coi: null as File | null,
        oshaLogs: null as File | null,
        safetyProgram: null as File | null,
        bankInfo: null as File | null,
      },
    },
    onSubmit: async (values: { [x: string]: any; files: any }) => {
      try {
        const { files, ...supplierData } = values;
        await onboardSupplier(JSON.stringify(supplierData), {
          coi: files.coi || undefined,
          safetyProgram: files.safetyProgram || undefined,
          oshaLogs: files.oshaLogs || undefined,
          bankInfo: files.bankInfo || undefined,
        });

        formik.resetForm();
        router.push("/dashboard");
        // Handle success (e.g., show message, redirect)
      } catch (error) {
        console.error("Submission error:", error);
      }
    },
  });

  return (
    <Box sx={{ maxWidth: 800, margin: "auto" }}>
      <Typography variant="h5" color={grey[800]} fontWeight={600}>
        {businessType === BusinessType.CLIENT
          ? "Client Onboarding"
          : "Supplier Onboarding"}
      </Typography>

      <Stepper orientation="vertical">
        {steps.map((step, index) => (
          <Step key={index} expanded>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              <step.component
                formData={formik.values}
                handleChange={formik.setFieldValue}
                handleFileUpload={formik.setFieldValue}
                touched={formik.touched}
                errors={formik.errors}
              />
              <Box sx={{ mt: 2 }}>
                {index === steps.length - 1 && (
                  <Button
                    sx={{ mr: 1 }}
                    variant="contained"
                    onClick={formik.submitForm}
                    disabled={formik.isSubmitting}
                  >
                    Submit
                  </Button>
                )}
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default DynamicOnboardingForm;
