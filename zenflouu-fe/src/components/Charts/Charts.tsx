"use client";

import { Box, useTheme } from "@mui/material";
import { areaElementClasses, BarChart, SparkLineChart } from "@mui/x-charts";

function AreaGradient({ color, id }: { color: string; id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.3} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}
interface SparklineChartProps {
  data: { date?: string; count: number; serviceType?: string }[];
}
export const DashboardSparklineChart: React.FC<SparklineChartProps> = ({
  data,
}) => {
  const theme = useTheme();
  const counts = data.map((item) => item.count);
  const xAxisLabels = data.map((item) =>
    item.date
      ? new Date(item.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      : item.serviceType || "Unknown"
  );

  // Determine trend based on counts (works for both date & serviceType)
  let trend: "up" | "down" | "neutral" = "neutral";
  if (data.length > 1) {
    const prevValue = counts[counts.length - 2];
    const latestValue = counts[counts.length - 1];

    if (latestValue > prevValue) trend = "up";
    else if (latestValue < prevValue) trend = "down";
  }

  const trendColors = {
    up: theme.palette.success.main,
    down: theme.palette.error.main,
    neutral: theme.palette.grey[400],
  };

  const chartColor = trendColors[trend];
  const gradientId = `area-gradient-${trend}`;

  return (
    <Box sx={{ width: "100%", height: 50 }}>
      <SparkLineChart
        colors={[chartColor]}
        data={counts}
        area
        showHighlight
        showTooltip
        xAxis={{
          scaleType: "band",
          data: xAxisLabels,
        }}
        sx={{
          [`& .${areaElementClasses.root}`]: {
            fill: `url(#${gradientId})`,
          },
        }}
      >
        <AreaGradient color={chartColor} id={gradientId} />
      </SparkLineChart>
    </Box>
  );
};

interface RequirementStatusChartProps {
  data: number[];
}
export const RequirementStatusChart: React.FC<RequirementStatusChartProps> = ({
  data,
}) => {
  const theme = useTheme();
  const colorPalette = [theme.palette.primary.main];
  return (
    <>
      <BarChart
        colors={colorPalette}
        borderRadius={8}
        xAxis={
          [
            {
              scaleType: "band",
              categoryGapRatio: 0.5,
              data: ["Pending", "Submitted"],
            },
          ] as any
        }
        series={[
          {
            id: "requirement-status",
            label: "Requirement Status",
            data: data,
            stack: "A",
          },
        ]}
        height={72}
        margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
        grid={{ horizontal: true }}
        slotProps={{
          legend: {
            hidden: true,
          },
        }}
      />
    </>
  );
};

interface WorkStatusChartProps {
  data: number[];
}
export const WorkStatusChart: React.FC<WorkStatusChartProps> = ({ data }) => {
  const theme = useTheme();
  const colorPalette = [theme.palette.primary.dark];
  return (
    <>
      <BarChart
        colors={colorPalette}
        borderRadius={8}
        xAxis={
          [
            {
              scaleType: "band",
              categoryGapRatio: 0.5,
              data: ["Approved", "Not Approved"],
            },
          ] as any
        }
        series={[
          {
            id: "work-status",
            label: "Work Status",
            data: data,
            stack: "A",
          },
        ]}
        height={72}
        margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
        grid={{ horizontal: true }}
        slotProps={{
          legend: {
            hidden: true,
          },
        }}
      />
    </>
  );
};

interface ContractTypeProps {
  data: number[];
}
export const ContractTypeChart: React.FC<ContractTypeProps> = ({ data }) => {
  const theme = useTheme();
  const colorPalette = [theme.palette.primary.light];
  return (
    <>
      <BarChart
        colors={colorPalette}
        borderRadius={8}
        xAxis={
          [
            {
              scaleType: "band",
              categoryGapRatio: 0.5,
              data: ["Direct", "Subcontracted"],
            },
          ] as any
        }
        series={[
          {
            id: "contract-type",
            label: "Contract Type",
            data: data,
            stack: "A",
          },
        ]}
        height={72}
        margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
        grid={{ horizontal: true }}
        slotProps={{
          legend: {
            hidden: true,
          },
        }}
      />
    </>
  );
};

interface WorkOrderStatusProps {
  data: number[];
}
export const WorkOrderStatusChart: React.FC<WorkOrderStatusProps> = ({
  data,
}) => {
  const theme = useTheme();
  const colorPalette = [theme.palette.primary.light];
  return (
    <>
      <BarChart
        colors={colorPalette}
        borderRadius={8}
        xAxis={
          [
            {
              scaleType: "band",
              categoryGapRatio: 0.5,
              data: ["Pending", "Completed", "In Progress", "Cancelled"],
            },
          ] as any
        }
        series={[
          {
            id: "work-order-status",
            label: "Work Order Status",
            data: data,
            stack: "A",
          },
        ]}
        height={72}
        margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
        grid={{ horizontal: true }}
        slotProps={{
          legend: {
            hidden: true,
          },
        }}
      />
    </>
  );
};
