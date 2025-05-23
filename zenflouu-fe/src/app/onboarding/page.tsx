"use client";
import DynamicOnboardingForm from "@/components/DynamicOnboardingForm/DynamicOnboardingForm";
import { Grid2, Stack } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
import { AppBarComponent, BusinessType } from "xarton-1";

export default function Onboarding() {
  const searchParams = useSearchParams();
  const businessType =
    (searchParams.get("businessType") as
      | BusinessType
      | BusinessType.SUPPLIER) || BusinessType.CLIENT;
  const name = searchParams.get("name") || "";
  const email = searchParams.get("email") || "";
  const router = useRouter();

  return (
    <>
      <title>ZenFlouu | Onboarding</title>
      <Stack bgcolor="white" p={3}>
        <AppBarComponent
          isCaptive={true}
          onCancelOnboarding={() => router.push("/sign-in")}
        />
        <Grid2 sx={{ bgcolor: "white", height: "auto", mt: 11.813 }}>
          <DynamicOnboardingForm
            businessType={businessType}
            name={name}
            email={email}
          />
        </Grid2>
      </Stack>
    </>
  );
}
