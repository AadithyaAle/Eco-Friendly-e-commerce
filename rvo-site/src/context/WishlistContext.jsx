import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { 
  getWishlist, 
  addToWishlist as apiAddToWishlist, 
  removeFromWishlist as apiRemoveFromWishlist
} from '../services/wishlist';

const WishlistContext = createContext();

export function useWishlist() {
  return useContext(WishlistContext);
}

export function WishlistProvider({ children }) {
  const { currentUser } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial wishlist
  useEffect(() => {
    const loadWishlist = async () => {
      setIsLoading(true);
      try {
        if (currentUser) {
          const data = await getWishlist(currentUser.uid);
          const formattedWishlist = data.map(wi => ({
            wishlistItemId: wi.id,
            id: wi.product_id,
            name: wi.product?.name,
            price: wi.product?.price || wi.product?.discount_price,
            image: wi.product?.image,
            inStock: wi.product?.stock > 0
          }));
          setWishlistItems(formattedWishlist);
        } else {
          const localWishlist = JSON.parse(localStorage.getItem('rvo_wishlist_v2')) || [];
          setWishlistItems(localWishlist);
        }
      } catch (error) {
        console.error('Error loading wishlist:', error);
      }
      setIsLoading(false);
    };

    if (currentUser !== undefined) {
      loadWishlist();
    }
  }, [currentUser]);

  // Save wishlist for guests
  useEffect(() => {
    if (!isLoading && !currentUser) {
      localStorage.setItem('rvo_wishlist_v2', JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, currentUser, isLoading]);

  const toggleWishlist = async (product) => {
    const exists = wishlistItems.some(item => item.id === product.id);
    
    if (exists) {
      await removeFromWishlist(product.id);
    } else {
      // optimistic update
      setWishlistItems(prev => [...prev, { ...product, id: product.id }]);
      
      if (currentUser) {
        try {
          await apiAddToWishlist(currentUser.uid, product.id);
          // reload to get wishlistItemId
          const data = await getWishlist(currentUser.uid);
          setWishlistItems(data.map(wi => ({
            wishlistItemId: wi.id,
            id: wi.product_id,
            name: wi.product?.name,
            price: wi.product?.price || wi.product?.discount_price,
            image: wi.product?.image,
            inStock: wi.product?.stock > 0
          })));
        } catch (e) {
          console.error(e);
        }
      }
    }
  };

  const removeFromWishlist = async (id) => {
    const itemToRemove = wishlistItems.find(item => item.id === id);
    setWishlistItems(prev => prev.filter(item => item.id !== id));

    if (currentUser && itemToRemove?.wishlistItemId) {
      try {
        await apiRemoveFromWishlist(itemToRemove.wishlistItemId);
      } catch (e) {
        console.error(e);
      }
    }
  };
  
  const isInWishlist = (id) => {
    return wishlistItems.some(item => item.id === id);
  };

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      toggleWishlist,
      removeFromWishlist,
      isInWishlist,
      isLoading
    }}>
      {children}
    </WishlistContext.Provider>
  );
}
