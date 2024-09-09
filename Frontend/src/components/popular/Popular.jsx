import React, { useEffect, useState } from "react";
import "./Popular.css";
// import data_product from "../Assets/data";
import Item from "../item/Item";
import { BASE_URL } from "../../App";

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);

  console.log("popularProducts", popularProducts);

  const getPopularProducts = () => {
    fetch(`${BASE_URL}/products/popularinwomen`)
      .then((response) => response.json())
      .then((data) => setPopularProducts(data));
  };

  useEffect(() => {
    getPopularProducts();
  }, []);

  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>

      <hr />

      <div className="popular-item">
        {popularProducts?.map((item, index) => {
          return (
            <Item
              key={index}
              id={item._id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
