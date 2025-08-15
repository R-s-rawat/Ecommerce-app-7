import React from "react";

const Sorting = ({
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
  const handleClick = (id) => {
    setSortPriceRadio(id);
    sortRef.current = id;
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

  const renderBoxes = (extraClasses) =>
    sortType.map((t) => {
      const isActive = sortPriceRadio === t._id;
      return (
        <div
          key={t._id}
          className={`sort-box ${isActive ? "active" : "inactive"}`}
          onClick={() => handleClick(t._id)}
        >
          {t.name}
        </div>
      );
    });

  return (
    <div className="d-flex flex-row mb-3">
      {/* Desktop */}
      <div className="sort-by-boxes flex-wrap d-none d-md-flex">
        {renderBoxes()}
      </div>

      {/* Mobile */}
      <div className="sort-by-boxes flex-wrap d-flex d-md-none">
        {renderBoxes()}
      </div>
    </div>
  );
};

export default Sorting;
