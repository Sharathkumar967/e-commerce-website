import React, { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../App";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [all_product, setAllProduct] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllProducts = () => {
    setLoading(true);
    fetch(`${BASE_URL}/products/allproducts`)
      .then((response) => response.json())
      .then((data) => {
        setAllProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  };

  const fetchCartData = async () => {
    const token = localStorage.getItem("auth-token");

    if (token) {
      fetch(`${BASE_URL}/products/getCart`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "auth-token": token,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())

        .then((data) => {
          if (data.success) {
            console.log("successGetDAta", data.cartData);
            setCartItems(data.cartData);
          } else {
            console.error(
              "Failed to fetch cart data:",
              data.error || data.message
            );
          }
        })
        .catch((error) => console.error("Error:", error));
    } else {
      console.error("Auth token not found. Please log in.");
    }
  };

  const addToCart = async (itemId) => {
    const token = localStorage.getItem("auth-token");
    console.log("token", token);
    if (!token) {
      alert("Please login");
      return;
    }

    if (token) {
      fetch(`${BASE_URL}/products/addToCart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartId: itemId }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            fetchCartData();
            console.log(data);
          }
        })
        .catch((error) => console.error("Error:", error));
    } else {
      console.error("Auth token not found. Please log in.");
    }
  };

  const removeFromCart = async (itemId) => {
    const token = localStorage.getItem("auth-token");
    if (!token) {
      alert("Please login");
      return;
    }
    if (token) {
      fetch(`${BASE_URL}/products/removeFromCart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: itemId }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            fetchCartData();
            console.log(data);
          }
        })
        .catch((error) => console.error("Error:", error));

      await fetchCartData();
      getTotalCartAmount();
      getTotalCartItems();
    } else {
      console.error("Auth token not found. Please log in.");
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    cartItems.forEach((item) => {
      if (item.new_price) {
        totalAmount += item.new_price;
      } else {
        console.error(`Item info not found or incomplete for ID: ${item._id}`);
      }
    });
    return totalAmount;
  };

  const getTotalCartItems = () => {
    return cartItems.length;
  };

  useEffect(() => {
    getAllProducts();
    fetchCartData();
  }, []);

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    addToCart,
    removeFromCart,
    cartItems,
    loading,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
