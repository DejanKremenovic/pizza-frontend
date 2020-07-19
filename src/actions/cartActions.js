import axios from "axios";
import { BACKEND_URL } from "../config";
import { getFormattedToken } from "../utils";

export const getProductsFromStorage = () => {
  return localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
};

/*
  Add product to local storage
*/
export const addToCart = (product, amount) => {
  let content = {
    id: product.id,
    name: product.name,
    price: product.price,
    amount: amount,
    currency: "EUR",
  };
  let cart = localStorage.getItem("cart");

  if (cart) {
    cart = JSON.parse(cart);
    let doesExist = false;
    for (var i = 0; i < cart.length; i++) {
      if (cart[i]["id"] === product.id) {
        content["amount"] =
          parseInt(cart[i]["amount"]) + parseInt(content["amount"]);
        cart[i] = content;
        doesExist = true;
        break;
      }
    }
    if (!doesExist) {
      cart.push(content);
    }
  } else {
    cart = [content];
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};


/*
  Do order checkout
*/
export const checkout = (products) => {
  const body = JSON.stringify(products);
  return axios.post(`${BACKEND_URL}orders`, body, {
    headers: {
        "Content-Type": "application/json",
        "Authorization": getFormattedToken()
    }
  });
};

/*
  Remove single or all products from local storage. productId is optional.
*/
export const removeProductsFromStorage = (productId) => {
  if (productId) {
    let cart = localStorage.getItem("cart");
    cart = JSON.parse(cart);
    for (var i = 0; i < cart.length; i++) {
      if (cart[i]["id"] === productId) {
        cart.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    localStorage.removeItem("cart");
  }
};
