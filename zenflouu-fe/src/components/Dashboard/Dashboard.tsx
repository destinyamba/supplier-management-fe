"use client";
import { Typography, Stack } from "@mui/material";
import React from "react";
import { ChartCard, StatCard } from "../DashboardCard/DashboardCard";
import { useDashboardData } from "@/hooks/useDashboardData";
import {
  RequirementStatusChart,
  WorkStatusChart,
  ContractTypeChart,
  DashboardSparklineChart,
  WorkOrderStatusChart,
} from "../Charts/Charts";

export const Dashboard = () => {
  const {
    totalSuppliers,
    totalWO,
    totalUpcomingWO,
    requirementsCount,
    workStatusCount,
    contractTypeCount,
    woStatusCount,
    suppliersOverTime,
    avgWOCompletionTime,
    woByService,
    suppliersByService,
  } = useDashboardData();
  return (
    <>
      <Stack spacing={1} useFlexGap sx={{ flexWrap: "wrap", width: "100%" }}>
        <Typography fontWeight={600} variant="h4">
          Dashboard
        </Typography>

        <Stack spacing={1} direction="row" useFlexGap sx={{ flexWrap: "wrap" }}>
          <StatCard
            title="Total Suppliers"
            value={totalSuppliers.toString() || 0}
          />
          <StatCard
            title="Requirements Status"
            children={
              <RequirementStatusChart data={Object.values(requirementsCount)} />
            }
          />
          <StatCard
            title="Work Status"
            children={<WorkStatusChart data={Object.values(workStatusCount)} />}
          />
          <StatCard
            title="Contract Type"
            children={
              <ContractTypeChart data={Object.values(contractTypeCount)} />
            }
          />
          <StatCard title="Total Work Orders" value={totalWO.toString() || 0} />
        </Stack>
        <Stack spacing={1} direction="row" useFlexGap sx={{ flexWrap: "wrap" }}>
          <ChartCard
            title="Suppliers Onboarded Over Time"
            children={<DashboardSparklineChart data={suppliersOverTime} />}
          />
          <ChartCard
            title="Average Time to Complete Work Orders"
            children={<DashboardSparklineChart data={avgWOCompletionTime} />}
          />
        </Stack>
        <Stack spacing={1} direction="row" useFlexGap sx={{ flexWrap: "wrap" }}>
          <StatCard
            title="Upcoming Work Orders"
            value={totalUpcomingWO.toString() || 0}
          />
          <ChartCard
            title="Work Orders by Service Type"
            children={<DashboardSparklineChart data={woByService} />}
          />
        </Stack>
        <Stack spacing={1} direction="row" useFlexGap sx={{ flexWrap: "wrap" }}>
          <ChartCard
            title="Suppliers By Service"
            children={<DashboardSparklineChart data={suppliersByService} />}
          />
          <StatCard
            title="Work Orders by Status"
            children={
              <WorkOrderStatusChart data={Object.values(woStatusCount)} />
            }
          />
        </Stack>
      </Stack>
    </>
  );
};
