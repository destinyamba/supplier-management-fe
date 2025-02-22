import { getAllSuppliers } from "@/apis/suppliersService";
import { ISupplierCard } from "@/types";
import { Grid2, Pagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SupplierCard } from "../SupplierCard/SupplierCard";

export const DiscoverSuppliers = () => {
  const [suppliers, setSuppliers] = useState<ISupplierCard[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await getAllSuppliers(page);
        if (Array.isArray(response.data.suppliers)) {
          setSuppliers(response.data.suppliers);
          setTotalPages(response.data.totalPages);
        } else {
          console.error("Response data is not an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchSuppliers();
  }, [page]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
  return (
    <Grid2 container spacing={2} flexDirection="column" mx={2}>
      <Typography variant="h4" fontWeight={600} m={2}>
        Discover Suppliers
      </Typography>
      <Grid2 container spacing={2}>
        {suppliers.map((supplier, index) => (
          <Grid2
            size={4}
            key={`supplier-${supplier.supplierName}-${index}`}
            sx={{ display: "flex", flexDirection: "row" }}
          >
            <SupplierCard suppliers={supplier} />
          </Grid2>
        ))}
      </Grid2>
      <Grid2 m={2} display="flex" justifyContent="end">
        <Pagination
          page={page}
          count={totalPages}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
        />
      </Grid2>
    </Grid2>
  );
};
