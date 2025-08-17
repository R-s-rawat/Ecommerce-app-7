import { Drawer, Checkbox, Radio, Button } from "antd";
import { Prices } from "../../data/Prices";
import Sorting from "../Sort/Sorting"; 

const FilterDrawer = ({
  open,
  onClose,
  categories,
  checked,
  radio,
  setChecked,
  setRadio,
  handleCatFilter,
  onReset,
  sortType,
  sortPriceRadio,
  setSortPriceRadio,
  sortRef,
  setPage,
  getFilteredProducts,
  setProducts,
  setFilteredTotal,
}) => {
  return (
    <Drawer
      title="Filters"
      placement="right"
      onClose={onClose}
      open={open}
      width={300}
    >
      {/* Categories */}
      <h5>Categories</h5>
      {categories?.map((c) => (
        <Checkbox
          key={c._id}
          onChange={(e) =>
            handleCatFilter(e.target.checked, c._id, checked, setChecked)
          }
          checked={checked.includes(c._id)}
        >
          {c.name}
        </Checkbox>
      ))}

      {/* Price */}
      <h5 className="mt-4">Price</h5>
      <Radio.Group onChange={(e) => setRadio(e.target.value)} value={radio}>
        {Prices.map((p) => (
          <Radio key={p._id} value={p.array}>
            {p.name}
          </Radio>
        ))}
      </Radio.Group>

      {/* Sorting */}
      {/* <h5 className="mt-4">Sort By</h5>
      <Sorting
        variant="mobile"
        sortType={sortType}
        sortPriceRadio={sortPriceRadio}
        setSortPriceRadio={setSortPriceRadio}
        sortRef={sortRef}
        setPage={setPage}
        getFilteredProducts={getFilteredProducts}
        checked={checked}
        radio={radio}
        setProducts={setProducts}
        setFilteredTotal={setFilteredTotal}
      /> */}

      {/* Reset Button */}
      <Button className="mt-4" danger block onClick={onReset}>
        Reset Filters
      </Button>
    </Drawer>
  );
};

export default FilterDrawer;
