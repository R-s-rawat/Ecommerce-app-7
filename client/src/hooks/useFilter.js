
import { useState } from "react";

const useFilters = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 10000]);
  };

  const applyFilters = () => {
    // Apply logic here (e.g., refetch products or update query params)
    setDrawerOpen(false);
  };

  return {
    selectedCategories,
    setSelectedCategories,
    priceRange,
    setPriceRange,
    drawerOpen,
    setDrawerOpen,
    clearFilters,
    applyFilters,
  };
};

export default useFilters;
