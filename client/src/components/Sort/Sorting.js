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
  const handleChange = (e) => {
    const selectedId = e.target.value;
    setSortPriceRadio(selectedId);
    sortRef.current = selectedId;
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

  return (
    <>
     {/* Mobile version */}
<div className="mb-3 d-md-none d-flex justify-content-end">
  <select
    className="form-select w-auto"
    value={sortPriceRadio}
    onChange={handleChange}
  >
    {sortType.map((t) => (
      <option key={t._id} value={t._id}>
        {t.name}
      </option>
    ))}
  </select>
</div>

      {/* Desktop version */}
      <div className="mb-3 d-none d-md-block" style={{  padding: "0.5rem", borderRadius: "4px", 
       }}>
       
        <select
          id="desktopSort"
          className="form-select"
          value={sortPriceRadio}
          onChange={handleChange}
        >
          {sortType.map((t) => (
            <option key={t._id} value={t._id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Sorting;
