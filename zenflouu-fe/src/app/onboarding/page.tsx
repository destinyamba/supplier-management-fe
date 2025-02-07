"use client";
import { Grid2 } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
import { AppBarComponent, BusinessType, DynamicOnboardingForm } from "xarton-1";

export default function Onboarding() {
  const searchParams = useSearchParams();
  const businessType =
    (searchParams.get("businessType") as
      | BusinessType
      | BusinessType.SUPPLIER) || BusinessType.CLIENT;
  const router = useRouter();
  return (
    <>
      <AppBarComponent
        isCaptive={true}
        onCancelOnboarding={() => router.push("/signin")}
      />
      <Grid2 sx={{ bgcolor: "white", height: "100vh", mt: 11.813 }}>
        <DynamicOnboardingForm businessType={businessType} />
      </Grid2>
    </>
  );
}
