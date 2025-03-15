"use client";
import {
  Alert,
  Button,
  Grid2,
  Pagination,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { Plus } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { IWorkOrder } from "@/types";
import WorkOrderCard from "../WorkOrderCard/WorkOrderCard";
import { CreateWorkOrderDialog } from "../CreateWorkOrderDialog/CreateWorkOrderDialog";
import { clientWorkOrders } from "@/apis/workOrdersService";
import Link from "next/link";

export const WorkOrders = () => {
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [workOrders, setWorkOrders] = useState<IWorkOrder[]>([]);
  const [toggleDialog, setToggleDialog] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleToggleDialog = () => {
    setToggleDialog(true);
  };

  const handleDialogClose = () => {
    setToggleDialog(false);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  useEffect(() => {
    const fetchWOs = async () => {
      try {
        const pageData = await clientWorkOrders(page);
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
          Work Orders
        </Typography>
        <Button
          variant="contained"
          sx={{ mr: 2, mt: 2, height: 40, borderRadius: 32 }}
          size="medium"
          startIcon={<Plus />}
          onClick={handleToggleDialog}
        >
          Create Work Order
        </Button>
        <CreateWorkOrderDialog
          open={toggleDialog}
          onClose={handleDialogClose}
        />
      </Stack>
      {/* Search bar by work order number*/}
      <SearchBar
        placeholder={"Search by Work Order Number"}
        height={40}
        showFilter={false}
      />
      {/* List of work orders */}
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
      {/* Pagination */}
      <Grid2 m={2} display="flex" justifyContent="end">
        <Pagination
          page={page}
          count={totalPages}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
        />
      </Grid2>
    </>
  );
};
