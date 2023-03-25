import React, { useContext, useEffect, useState } from 'react'

const CartContext = React.createContext()

export function useCart() {
    return useContext(CartContext)
}

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem('cart')
        return storedCart ? JSON.parse(storedCart) : []
    })
  
    function removeProduct(product) {
        let updatedCart = [...cart];
        let cartItemIndex = updatedCart.findIndex(cartItem => cartItem.id === product.id);

        if (cartItemIndex !== -1) {
            const itemQuantity = updatedCart[cartItemIndex].quantity;
            if (itemQuantity === 1) {
                updatedCart.splice(cartItemIndex, 1);
            } else {
                updatedCart[cartItemIndex].quantity = itemQuantity - 1;
            }
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
    }
    
    function addProduct(product) {
        let updatedCart = [...cart];
    
        // check if the product already exists in the cart
        let cartItemIndex = updatedCart.findIndex(cartItem => cartItem.id === product.id);
    
        if (cartItemIndex !== -1) {
            updatedCart[cartItemIndex].quantity += 1;
        } else {
            updatedCart.push({ ...product, quantity: 1 });
        }
    
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }

    function clearCart() {
        setCart([])
        localStorage.setItem('cart', JSON.stringify([]));
    }

    useEffect(() => {
        console.log(cart)
    },[cart])


    const value = { 
        cart,
        addProduct,
        removeProduct,
        clearCart
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}