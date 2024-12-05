import React, { useState, useContext, useEffect } from 'react'

const cartContext = React.createContext([])

//useContex y useCart contex en una funcion, solamente solo importo esto en el componente q lo va autilizar.
export const useCartContext = () => useContext(cartContext)

export default function CartProvider({ children }) {
  //  creo un estado cart vacio
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem('cart')) || [],
  )

  //func agregar producto al carrito
  const addItem = (item, quantity) => {
    if (isInCart(item.id)) {
      setCart(
        cart.map((producto) => {
          return producto.id === item.id
            ? { ...producto, quantity: producto.quantity + quantity }
            : producto
        }),
      )
    } else {
      setCart([...cart, { ...item, quantity }])
    }
  }

  // func vaciarcarrito
  const clearCart = () => setCart([])

  //    func esta en el carrito?
  const isInCart = (id) =>
    cart.find((product) => product.id === id) ? true : false

  // func remover producto
  const removeProduct = (id) =>
    setCart(cart.filter((product) => product.id !== id))

  //func para el precio total
  const totalPrice = () => {
    return cart.reduce((prev, act) => prev + act.quantity * act.price, 0)
  }
  //func para el total de productos

  const totalProducts = () => {
    return cart.reduce((prev, act) => prev + act.quantity, 0)
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  return (
    <cartContext.Provider
      value={{
        clearCart,
        isInCart,
        removeProduct,
        addItem,
        totalPrice,
        totalProducts,
        cart,
      }}
    >
      {children}
    </cartContext.Provider>
  )
}
