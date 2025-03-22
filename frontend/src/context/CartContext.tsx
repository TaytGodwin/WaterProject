import { useState, ReactNode, createContext, useContext } from 'react';
import { CartItem } from '../types/CartItem';
// What the cart looks like
interface CartContextType {
  cart: CartItem[]; // Array of cartitems
  // The following are actions that can be performed on the cart
  addToCart: (item: CartItem) => void; // Pass in a cart item and don't return anything
  removeFromCart: (projectId: number) => void;
  clearCart: () => void;
}

// Tells system to use CartContext when a cart is created
const CartContext = createContext<CartContextType | undefined>(undefined);

// What the cart can do
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]); // Create the cart

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      // The following will return true or false
      const existingItem = prevCart.find((c) => c.projectId === item.projectId); // Make sure to check if the project to be added it in the cart already
      // Update previous cart
      const updatedCart = prevCart.map(
        (
          c // Go through previous cart
        ) =>
          c.projectId === item.projectId
            ? { ...c, donationAmount: c.donationAmount + item.donationAmount }
            : c // If proj id already in there, simply add to the amount
      );
      // Either return the cart with the updated amount or add the item after checking if existing item is true/false
      return existingItem ? updatedCart : [...prevCart, item]; // Take the previous cart that was passed in and add the item to the cart
    });
  };

  const removeFromCart = (projectId: number) => {
    // This will recieve the current cart and take out all projects that have the projectId = the Id passed in
    setCart((prevCart) => prevCart.filter((c) => c.projectId !== projectId)); // The filter function removes items from an array
  };

  const clearCart = () => {
    setCart(() => []);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  // Error handling
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context; // Return created context
};
