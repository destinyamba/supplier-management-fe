"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { Grid2, Pagination, Stack, Typography } from "@mui/material";
import { getAllSuppliers, nlpSearchSuppliers } from "@/apis/suppliersService";
import { ISupplierCard } from "@/types";
import { SupplierCard } from "../SupplierCard/SupplierCard";

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
          response = await getAllSuppliers(page);
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
      <Stack mx={2} spacing={2}>
        {/* Title and button to add a add from discoverable suppliers */}
        <Stack>
          <Typography variant="h4" fontWeight={600} mx={1} mt={2}>
            Approved Supplier List
          </Typography>
        </Stack>
        {/* Search bar with at the side and selected filter options show at the bottom of the bar */}
        <SearchBar
          placeholder={"Find minority owned suppliers"}
          height={40}
          onSearch={handleSearch}
        />
        {/* cards of approved suppliers */}
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
      </Stack>
    </>
  );
};
