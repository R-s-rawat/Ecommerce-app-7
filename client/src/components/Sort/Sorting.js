import React from "react";
import { Select } from "antd";

const Sorting = ({
  variant = "desktop",
  // sortType,
  sortType = [],   // ✅ ensure it’s always an array
  sortPriceRadio,
  setSortPriceRadio,
  setPage,
  getFilteredProducts,
  checked,
  radio,
  setProducts,
  setFilteredTotal,
}) => {
  const onChange = (value) => {
    setSortPriceRadio(value);
    setPage(1);
    getFilteredProducts({
      checked,
      radio,
      page: 1,
      // use a string key, not a ref
      sortKey: value,
      setProducts,
      setFilteredTotal,
      append: false,
    });
  };

  if (variant === "mobile") {
    return (
      <Select
        value={sortPriceRadio}
        onChange={onChange}
        style={{ width: "auto", minWidth: 140, maxWidth: 200 }}
        options={sortType.map((t) => ({ label: t.name, value: t._id }))}
      />
    );
  }

  return (
    <select
      className="form-select w-auto"
      value={sortPriceRadio}
      onChange={(e) => onChange(e.target.value)}
    >
      {sortType.map((t) => (
        <option key={t._id} value={t._id}>
          {t.name}
        </option>
      ))}
    </select>
  );
};

export default Sorting;
