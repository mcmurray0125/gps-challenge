import React, { useContext, useEffect, useState } from 'react';

const CartContext = React.createContext();

export function useCart() {
  return useContext(CartContext);
}

//Find the product to be changed
function findCartItemIndex(cart, product) {
  return cart.findIndex((cartItem) => cartItem.id === product.id);
}

//Updates product's quantity, removing if 0
function updateCartItemQuantity(cart, product, quantityChange) {
  const cartItemIndex = findCartItemIndex(cart, product);

  if (cartItemIndex !== -1) {
    const itemQuantity = cart[cartItemIndex].quantity;
    if (itemQuantity === 1 && quantityChange === -1) {
      cart.splice(cartItemIndex, 1);
    } else {
      cart[cartItemIndex].quantity = itemQuantity + quantityChange;
    }
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  return cart;
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  function removeProduct(product) {
    const updatedCart = [...cart];
    const updatedCartItems = updateCartItemQuantity(updatedCart, product, -1);

    setCart(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  }

  function addProduct(product) {
    const updatedCart = [...cart];
    const updatedCartItems = updateCartItemQuantity(updatedCart, product, 1);

    setCart(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  }

  //Removes the product and all its quantity from cart.
  function removeItem(product) {
    let updatedCart = cart.filter(cartItem => cartItem.id !== product.id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
}

  function clearCart() {
    setCart([]);
    localStorage.setItem('cart', JSON.stringify([]));
  }

  const value = {
    cart,
    addProduct,
    removeProduct,
    removeItem,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>);
}