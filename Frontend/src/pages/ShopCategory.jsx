import React, { useContext, useState } from "react";
import "./css/ShopCategory.css";
import { ShopContext } from "../context/ShopContext";

import Item from "../components/item/Item";

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);

  const [sortOption, setSortOption] = useState("");

  const getCategoryProducts = () => {
    return all_product.filter((item) => item.category === props.category);
  };

  const sortProducts = (products) => {
    if (sortOption === "price-asc") {
      return products.sort((a, b) => a.new_price - b.new_price);
    } else if (sortOption === "price-desc") {
      return products.sort((a, b) => b.new_price - a.new_price);
    }
    return products;
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const filteredProducts = getCategoryProducts();
  const sortedProducts = sortProducts(filteredProducts);

  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />

      <div className="shopcategory-indexSort">
        <p>
          <span>Showing {sortedProducts.length} </span> out of{" "}
          {all_product.length} products
        </p>

        <div className="shopcategory-sort">
          Sort by
          <select onChange={handleSortChange} value={sortOption}>
            <option value="">None</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
          {/* <img src={dropdown_icon} alt="dropdown icon" /> */}
        </div>
      </div>

      <div className="shopcategory-products">
        {sortedProducts.map((item, index) => (
          <Item
            key={index}
            id={item._id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>

      {filteredProducts.length < all_product.length && (
        <div className="shopcategory-loadmore-btn">
          <div className="shopcategory-loadmore">Load More</div>
        </div>
      )}
    </div>
  );
};

export default ShopCategory;
