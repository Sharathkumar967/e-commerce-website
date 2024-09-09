import React, { useState, useEffect } from "react";
import "./RelatedProducts.css";
import Item from "../item/Item";

const RelatedProducts = ({ productId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/products/relatedProducts/${productId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch related products");
        }
        const data = await response.json();
        setRelatedProducts(data.relatedProducts);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [productId]);

  if (loading) {
    return <p>Loading related products...</p>;
  }

  return (
    <div className="relatedProducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedProducts-item">
        {relatedProducts.map((item, index) => {
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

export default RelatedProducts;
