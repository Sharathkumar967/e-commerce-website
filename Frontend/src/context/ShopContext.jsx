import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [all_product, setAllProduct] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const getAllProducts = () => {
    fetch("http://localhost:4000/products/allproducts")
      .then((response) => response.json())
      .then((data) => setAllProduct(data));
  };

  const fetchCartData = async () => {
    const token = localStorage.getItem("auth-token");

    if (token) {
      fetch("http://localhost:4000/products/getCart", {
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
    if (token) {
      fetch("http://localhost:4000/products/addToCart", {
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
    if (token) {
      fetch("http://localhost:4000/products/removeFromCart", {
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
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
