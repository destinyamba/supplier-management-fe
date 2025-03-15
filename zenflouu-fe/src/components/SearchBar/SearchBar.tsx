"use client";
import { Button, Divider, IconButton, InputBase, Paper } from "@mui/material";
import { MagnifyingGlass, SlidersHorizontal } from "@phosphor-icons/react";
import React from "react";

interface SearchBarProps {
  placeholder: string;
  height: number;
  filterIconHeight?: number;
  showFilter?: boolean;
}
const SearchBar = ({
  placeholder,
  height,
  filterIconHeight,
  showFilter = true,
}: SearchBarProps) => {
  return (
    <Paper
      elevation={0}
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        mx: 3,
        border: "1.25px solid #E0E0E0",
        height: height,
        borderRadius: 32,
      }}
    >
      <InputBase
        id="search-bar"
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <MagnifyingGlass />
      </IconButton>
      {showFilter && (
        <>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

          <Button
            variant="contained"
            tabIndex={-1}
            startIcon={<SlidersHorizontal />}
            sx={{
              height: filterIconHeight,
              alignItems: "center",
              borderRadius: 32,
              ".MuiButton-startIcon": { m: 0 },
            }}
          />
        </>
      )}
    </Paper>
  );
};

export default SearchBar;
