import { createContext, useState } from "react";

export interface Product {
  id: string
  name: string
  description: string
  imageUrl: string
  price: number
  priceId: string
}

interface CartContextData {
  cartItems: Product[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  checkIfItemAlreadyExists: (productId: string) => boolean
  sumAllValues: () => number
}

interface CartContextProviderProps {
  children: React.ReactNode;
}

export const CartContext = createContext({} as CartContextData)

export function CartContextProvider({ children }: CartContextProviderProps) {

  const [cartItems, setCartItems] = useState<Product[]>([])
  
  function addToCart(product: Product) {
    setCartItems((state) => [...state, product])
  }

  function removeFromCart (producId: string) {
    setCartItems((state) => state.filter((product) => product.id !== producId))
  }

  function checkIfItemAlreadyExists(productId: string) {
    return cartItems.some((product) => product.id === productId)
  }

  function sumAllValues() {
    return cartItems.reduce((sum, product) => sum + product.price, 0)
  }


  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, checkIfItemAlreadyExists, sumAllValues }}>
      {children}
    </CartContext.Provider>
  )
}