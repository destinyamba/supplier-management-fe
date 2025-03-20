"use client";
import { Button, Divider, IconButton, InputBase, Paper } from "@mui/material";
import { MagnifyingGlass, SlidersHorizontal } from "@phosphor-icons/react";
import React, { useState } from "react";

interface SearchBarProps {
  placeholder: string;
  height: number;
  filterIconHeight?: number;
  showFilter?: boolean;
  onSearch: (query: string) => void;
}
const SearchBar = ({
  placeholder,
  height,
  filterIconHeight,
  showFilter = false,
  onSearch,
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };
  return (
    <Paper
      elevation={0}
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        border: "1.25px solid #E0E0E0",
        height: height,
        borderRadius: 32,
      }}
      onSubmit={handleSearchSubmit}
    >
      <InputBase
        id="search-bar"
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleSearchChange}
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
