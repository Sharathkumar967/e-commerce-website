import React, { useContext } from "react";
import "./ProductDisplay.css";

import star_icon from "../Assets/star_icon.png";

import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../context/ShopContext";

const ProductDisplay = (props) => {
  const { product } = props;

  const { addToCart } = useContext(ShopContext);

  return (
    <div className="productDisplay">
      <div className="productdispaly-left">
        <div className="productdisplay-img-list">
          <img src={product?.image} alt="" />
          <img src={product?.image} alt="" />
          <img src={product?.image} alt="" />
          <img src={product?.image} alt="" />
        </div>

        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product?.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" /> <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>

        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ${product?.old_price}
          </div>

          <div className="productdisplay-right-price-new">
            ${product?.new_price}
          </div>
        </div>

        <div className="productdisplay-right-description">
          A lightweight, usually knitted, pullover shirt, clos-fitting and a
          roudn neckline and short sleeves, worn as an undershirt or outershirt
          garment
        </div>

        <div className="productdisplay-right-size">
          <h1>Select Size</h1>

          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>

          <button onClick={() => addToCart(product._id)}>ADD TO CART</button>

          <p className="productdisplay-right-category">
            <span>Category : </span>
            Women, T-shirt, crop Top
          </p>

          <p className="productdisplay-right-category">
            <span>Tags : </span>
            Modern, Latest
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
