"use client";
import { supplierMatchWorkOrders } from "@/apis/workOrdersService";
import { IWorkOrder } from "@/types";
import {
  Stack,
  Snackbar,
  Alert,
  Typography,
  Grid2,
  Pagination,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import WorkOrderCard from "../WorkOrderCard/WorkOrderCard";
import Link from "next/link";

const Clients = () => {
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [workOrders, setWorkOrders] = useState<IWorkOrder[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  useEffect(() => {
    const fetchWOs = async () => {
      try {
        const pageData = await supplierMatchWorkOrders(page);
        setWorkOrders(pageData.wos);
        setTotalPages(pageData.totalPages);
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
        setSnackbarOpen(true);
        console.error("Error fetching work orders:", error);
      }
    };
    fetchWOs();
  }, [page]);
  return (
    <>
      {/* Title and create work order button */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* Title and create work order button */}
        <Stack
          sx={{
            mx: 1,
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Snackbar
            open={snackbarOpen && error !== null}
            autoHideDuration={2000}
            onClose={() => setSnackbarOpen(false)}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={() => setSnackbarOpen(false)}
              severity="error"
              sx={{ width: "100%" }}
            >
              {error}
            </Alert>
          </Snackbar>
          <Typography variant="h4" fontWeight={600} m={2}>
            Client Jobs
          </Typography>
        </Stack>

        {/* List of work orders */}
        <Box sx={{ flex: 1 }}>
          <Grid2 container spacing={2} mx={3.5} mt={2}>
            {workOrders.map((workOrder, index) => (
              <Grid2
                key={`workOrder-${workOrder.workOrderNumber}-${index}`}
                sx={{ display: "flex", flexDirection: "row" }}
              >
                <Link href={`/work-orders/${workOrder.id}`}>
                  <WorkOrderCard workOrders={workOrder} />
                </Link>
              </Grid2>
            ))}
          </Grid2>
        </Box>

        {/* Pagination */}
        <Box
          sx={{
            py: 2,
            px: 2,
            display: "flex",
            justifyContent: "flex-end",
            mt: "auto",
          }}
        >
          <Pagination
            page={page}
            count={totalPages}
            onChange={handlePageChange}
            variant="outlined"
            color="primary"
          />
        </Box>
      </Box>
    </>
  );
};

export default Clients;
