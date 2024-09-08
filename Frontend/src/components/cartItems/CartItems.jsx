import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./CartItems.css";
import { ShopContext } from "../../context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";

const CartItems = () => {
  const { getTotalCartAmount, cartItems, removeFromCart, all_product } =
    useContext(ShopContext);
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="cartItems">
      <div className="cartItem-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {cartItems?.map((e) => {
        const itemInfo = all_product.find((product) => product._id === e._id);
        return (
          <div key={e._id}>
            <div className="cartItems-format cartItem-format-main">
              <img
                src={itemInfo?.image}
                alt=""
                className="carticon-product-icon"
              />
              <p>{itemInfo?.name}</p>
              <p>${itemInfo?.new_price}</p>
              <p>${itemInfo?.new_price}</p>
              <img
                src={remove_icon}
                alt=""
                className="cartitems-remove-icon"
                onClick={() => removeFromCart(e._id)}
              />
            </div>
            <hr />
          </div>
        );
      })}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>$ {Number(getTotalCartAmount())}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>$ {Number(getTotalCartAmount())}</h3>
            </div>
          </div>

          <button onClick={handleProceedToCheckout}>PROCEED TO CHECKOUT</button>
        </div>

        <div className="cartitems-promocode">
          <p>If you have a promo code, enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="Promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
