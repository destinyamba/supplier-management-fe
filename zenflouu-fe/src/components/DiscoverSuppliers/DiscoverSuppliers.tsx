import { getAllSuppliers } from "@/apis/suppliersService";
import { ISupplierCard } from "@/types";
import { Grid2, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SupplierCard } from "xarton-1";

interface SupplierListProps {
  suppliers: ISupplierCard[];
}
export const DiscoverSuppliers = () => {
  const [suppliers, setSuppliers] = useState<ISupplierCard[]>([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await getAllSuppliers();
        if (Array.isArray(response.data.suppliers)) {
          setSuppliers(response.data.suppliers);
          console.log(response.data.suppliers);
        } else {
          console.error("Response data is not an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchSuppliers();
  }, []);
  return (
    <Grid2 container spacing={2} flexDirection="column">
      <Typography variant="h4" fontWeight={600} m={2}>
        Discover Suppliers
      </Typography>
      <Grid2 sx={{ display: "flex", flexDirection: "row" }} spacing={2}>
        {suppliers.map((supplier, index) => (
          <Grid2
            sx={{ m: 2, display: "flex", flexDirection: "row" }}
            spacing={2}
            key={`supplier-${supplier.supplierName}-${index}`}
          >
            <SupplierCard suppliers={supplier} />
          </Grid2>
        ))}
      </Grid2>
    </Grid2>
  );
};
