import React, { useEffect, useState, forwardRef } from "react";
import "./NewCollection.css";
import Item from "../item/Item";
import { BASE_URL } from "../../App";

const NewCollections = forwardRef((props, ref) => {
  const [new_collection, setNewCollection] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/products/newCollections`)
      .then((response) => response.json())
      .then((data) => setNewCollection(data))
      .catch((error) =>
        console.error("Error fetching new collections:", error)
      );
  }, []);

  return (
    <div ref={ref} className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item) => (
          <Item
            key={item._id}
            id={item._id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
});

export default NewCollections;
