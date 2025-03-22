import { getAllSuppliers, nlpSearchSuppliers } from "@/apis/suppliersService";
import { ISupplierCard } from "@/types";
import { Grid2, Link, Pagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SupplierCard } from "../SupplierCard/SupplierCard";
import SearchBar from "../SearchBar/SearchBar";

export const DiscoverSuppliers = () => {
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
    <Grid2 container spacing={2} flexDirection="column" mx={2}>
      <Typography variant="h4" fontWeight={600} mt={2}>
        Discover Suppliers
      </Typography>
      <SearchBar
        placeholder={"Find minority owned suppliers"}
        height={52}
        onSearch={handleSearch}
      />
      <Grid2 container spacing={2}>
        {suppliers.map((supplier, index) => (
          <Grid2
            size={4}
            key={`supplier-${supplier.supplierName}-${index}`}
            sx={{ display: "flex", flexDirection: "row" }}
          >
            <Link
              href={`/discover/${supplier.id}`}
              sx={{ textDecoration: "none" }}
            >
              <SupplierCard suppliers={supplier} />
            </Link>
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
