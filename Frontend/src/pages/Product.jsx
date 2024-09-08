import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import BreadCrum from "../components/Breadcrum/BreadCrum";
import ProductDisplay from "../components/productDisplay/ProductDisplay";
import DescriptionBox from "../components/descriptionBox/DescriptionBox";
import RelatedProducts from "../components/relatedProducts/RelatedProducts";

const Product = () => {
  const { all_product } = useContext(ShopContext);

  console.log("all_product", all_product);

  const { productId } = useParams();

  const product = all_product
    ? all_product.find((e) => String(e._id) === String(productId))
    : null;

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
