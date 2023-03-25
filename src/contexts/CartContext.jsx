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
  
    function removeProduct(id) {
        let updatedCart = [...cart];
        let productIndex = updatedCart.findIndex(product => product.id === id);

        if (productIndex !== -1) {
            const productQuantity = updatedCart[productIndex].quantity;
            if (productQuantity === 1) {
                updatedCart.splice(productIndex, 1);
            } else {
                updatedCart[productIndex].quantity = productQuantity - 1;
            }
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
    }
    
    function addProduct(id, price) {
        let updatedCart = [...cart];
    
        // check if the product already exists in the cart
        let productIndex = updatedCart.findIndex(product => product.id === id);
    
        if (productIndex !== -1) {
            updatedCart[productIndex].quantity += 1;
        } else {
            updatedCart.push({ id, price, quantity: 1 });
        }
    
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }

    useEffect(() => {
        console.log(cart)
    },[cart])


    const value = { 
        cart,
        addProduct,
        removeProduct
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}