import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { 
  getCart, 
  addToCart as apiAddToCart, 
  removeFromCart as apiRemoveFromCart, 
  updateCartItemQty as apiUpdateQty,
  clearUserCart
} from '../services/cart';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const { currentUser } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial cart
  useEffect(() => {
    const loadCart = async () => {
      setIsLoading(true);
      try {
        if (currentUser) {
          const data = await getCart(currentUser.uid);
          const formattedCart = data.map(ci => ({
            cartItemId: ci.id,
            id: ci.product_id,
            name: ci.product?.name,
            price: ci.product?.price || ci.product?.discount_price,
            image: ci.product?.image,
            qty: ci.qty
          }));
          setCartItems(formattedCart);
        } else {
          // Use local storage for guest
          const localCart = JSON.parse(localStorage.getItem('rvo_cart_v2')) || [];
          setCartItems(localCart);
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      }
      setIsLoading(false);
    };

    if (currentUser !== undefined) {
      loadCart();
    }
  }, [currentUser]);

  // Save cart for guests
  useEffect(() => {
    if (!isLoading && !currentUser) {
      localStorage.setItem('rvo_cart_v2', JSON.stringify(cartItems));
    }
  }, [cartItems, currentUser, isLoading]);

  const addToCart = async (product, quantity = 1) => {
    // optimistic update
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
          ? { ...item, qty: item.qty + quantity }
          : item
        );
      }
      return [...prev, { ...product, id: product.id, qty: quantity }];
    });

    if (currentUser) {
      try {
        await apiAddToCart(currentUser.uid, product.id, quantity);
        // refresh to get cartItemId if it was newly added
        const data = await getCart(currentUser.uid);
        setCartItems(data.map(ci => ({
          cartItemId: ci.id,
          id: ci.product_id,
          name: ci.product?.name,
          price: ci.product?.price || ci.product?.discount_price,
          image: ci.product?.image,
          qty: ci.qty
        })));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const removeFromCart = async (id) => {
    const itemToRemove = cartItems.find(item => item.id === id);
    setCartItems(prev => prev.filter(item => item.id !== id));

    if (currentUser && itemToRemove?.cartItemId) {
      try {
        await apiRemoveFromCart(itemToRemove.cartItemId);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const updateQuantity = async (id, delta) => {
    const itemToUpdate = cartItems.find(item => item.id === id);
    if (!itemToUpdate) return;
    
    const newQty = Math.max(1, itemToUpdate.qty + delta);
    
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, qty: newQty };
      }
      return item;
    }));

    if (currentUser && itemToUpdate.cartItemId) {
      try {
        await apiUpdateQty(itemToUpdate.cartItemId, newQty);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const clearCart = async () => {
    setCartItems([]);
    if (currentUser) {
      try {
        await clearUserCart(currentUser.uid);
      } catch (e) {
        console.error(e);
      }
    } else {
      localStorage.removeItem('rvo_cart_v2');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + ((item.price || 0) * item.qty), 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      subtotal,
      cartTotal,
      isLoading
    }}>
      {children}
    </CartContext.Provider>
  );
}
