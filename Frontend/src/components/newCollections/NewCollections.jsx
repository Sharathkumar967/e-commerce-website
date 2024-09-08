import React, { useEffect, useState } from "react";
import "./NewCollection.css";
// import new_collection from "../Assets/new_collections";
import Item from "../item/Item";

const NewCollections = () => {
  const [new_collection, setNewCollection] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/products/newCollections").then((response) =>
      response.json().then((data) => setNewCollection(data))
    );
  }, []);

  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item, index) => {
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

export default NewCollections;
