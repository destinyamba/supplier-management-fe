"use client";
import { Button, Grid2, Pagination, Stack, Typography } from "@mui/material";
import { Plus } from "@phosphor-icons/react";
import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { IWorkOrder } from "@/types";
import WorkOrderCard from "../WorkOrderCard/WorkOrderCard";
import { CreateWorkOrderDialog } from "../CreateWorkOrderDialog/CreateWorkOrderDialog";

export const WorkOrders = () => {
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [workOrders, setWorkOrders] = useState<IWorkOrder[]>([]);
  const [toggleDialog, setToggleDialog] = useState<boolean>(false);

  const handleToggleDialog = () => {
    setToggleDialog(true);
  };

  const handleDialogClose = () => {
    setToggleDialog(false);
  };
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
      <Grid2 container spacing={2} flexDirection="column" mx={2}>
        <Grid2 container spacing={2}>
          {workOrders.map((workOrder, index) => (
            <Grid2
              size={4}
              key={`workOrder-${workOrder.workOrderNumber}-${index}`}
              sx={{ display: "flex", flexDirection: "row" }}
            >
              <WorkOrderCard workOrders={workOrder} />
            </Grid2>
          ))}
        </Grid2>
        {/* Pagination */}
        {/* <Grid2 m={2} display="flex" justifyContent="end">
          <Pagination
            page={page}
            count={totalPages}
            onChange={() => {}}
            variant="outlined"
            color="primary"
          />
        </Grid2> */}
      </Grid2>
    </>
  );
};
