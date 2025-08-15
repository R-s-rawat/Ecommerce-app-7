import React from "react";
import { Select } from "antd";

const Sorting = ({
  variant = "desktop", // "mobile" or "desktop"
  sortType,
  sortPriceRadio,
  setSortPriceRadio,
  sortRef,
  setPage,
  getFilteredProducts,
  checked,
  radio,
  setProducts,
  setFilteredTotal,
}) => {
  const onChange = (value) => {
    setSortPriceRadio(value);
    sortRef.current = value;
    setPage(1);
    getFilteredProducts({
      checked,
      radio,
      page: 1,
      sortRef,
      setProducts,
      setFilteredTotal,
    });
  };

  if (variant === "mobile") {
    // IMPORTANT: width: "auto" so it doesn't stretch full width on mobile
    return (
      <Select
        value={sortPriceRadio}
        onChange={onChange}
        style={{ width: "auto", minWidth: 140, maxWidth: 200 }}
        options={sortType.map((t) => ({ label: t.name, value: t._id }))}
      />
    );
  }

  // Desktop (Bootstrap select)
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
