import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import BreadCrum from "../components/Breadcrum/BreadCrum";
import ProductDisplay from "../components/productDisplay/ProductDisplay";
import DescriptionBox from "../components/descriptionBox/DescriptionBox";
import RelatedProducts from "../components/relatedProducts/RelatedProducts";

const Product = () => {
  const { all_product, loading } = useContext(ShopContext);
  const { productId } = useParams();

  if (loading) {
    return <p>Loading product...</p>;
  }

  const product = all_product
    ? all_product.find((e) => String(e._id) === String(productId))
    : null;

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div>
      <BreadCrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts productId={product?._id} />
    </div>
  );
};

export default Product;
