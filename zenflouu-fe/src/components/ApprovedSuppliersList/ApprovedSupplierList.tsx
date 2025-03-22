"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import {
  Box,
  Button,
  Grid2,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { getAllSuppliers, nlpSearchSuppliers } from "@/apis/suppliersService";
import { ISupplierCard } from "@/types";
import { SupplierCard } from "../SupplierCard/SupplierCard";
import { Plus } from "@phosphor-icons/react";
import { getClientSuppliers } from "@/apis/clientService";

export const ApprovedSupplierList = () => {
  const [suppliers, setSuppliers] = useState<ISupplierCard[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const pageSize = 12;

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        let response;
        // Only use search API if there's a query, otherwise use default getAllSuppliers
        if (query.trim()) {
          response = await nlpSearchSuppliers(query, page, pageSize);
        } else {
          response = await getClientSuppliers(page);
        }

        if (Array.isArray(response.data.suppliers)) {
          setSuppliers(response.data.suppliers);
          setTotalPages(response.data.totalPages);
        } else {
          console.error("Response data is not an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    fetchSuppliers();
  }, [page, query]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setPage(1);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
  return (
    <>
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
            mx: 0,
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <Typography variant="h4" fontWeight={600} m={2}>
            Approved Supplier List
          </Typography>
        </Stack>
        {/* Search bar with at the side and selected filter options show at the bottom of the bar */}

        <Box sx={{ mx: 2 }}>
          <SearchBar
            placeholder={"Find minority owned suppliers"}
            height={40}
            onSearch={handleSearch}
          />
        </Box>
        {/* List of work orders */}
        <Box sx={{ flex: 1 }}>
          <Grid2 container spacing={2} mx={2} mt={2}>
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
