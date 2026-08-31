'use client'
import { websiteConfig } from "@/config/websiteConfig";
import { Cart, CartItem } from "@/types";
import { useEffect, useState } from "react";

type useCartReturn = {
   cart: Cart | null;
   addToCart: (item: CartItem) => void;
   removeFromCart: (productId: CartItem['productId']) => void;
   updateCart: (updatedItem: CartItem) => void;
   clearCart: () => void;
}

export default function useCart (): useCartReturn {
   const localStorageKey = `${websiteConfig.name.toLowerCase().replaceAll(" ","-")}-cart`
   const [cart, setCart] = useState<Cart>([]);
   const [cartLoaded, setCartLoaded] = useState(false);

   function updateCart (updatedItem: CartItem) {
      setCart(prevCart => {
         return prevCart.map(cartItem =>
            cartItem.productId === updatedItem.productId
               ? updatedItem
               : cartItem
         );
      })
   }

   function addToCart (item: CartItem) {
      if (cart == null) return;
      if (cart.filter(ci => ci.productId == item.productId).length > 0) {
         setCart(prevCart => {
            return prevCart.map(cartItem =>
               cartItem.productId === item.productId
                  ? { ...item, quantity: item.quantity + cartItem.quantity }
                  : cartItem
            );
         })
      } else {
         setCart(p => ([ ...p!, item ]));
      }
   }

   function removeFromCart (productId: CartItem['productId']) {
      if (cart == null) return;
      setCart(c => ([ ...c!.filter(ci => ci.productId !== productId) ]));
   }

   function clearCart () {
      setCart(p => ([]));
   }

   useEffect(() => {
      const storedCart = localStorage.getItem(localStorageKey);
      if (storedCart) {
         try {
            setCart(p => ([...JSON.parse(storedCart!)]));
         } catch (e) {
            setCart([]);
         }
      } else {
         setCart([]);
      }
      setCartLoaded(true)
   }, [localStorageKey]);

   useEffect(() => {
      if (!cartLoaded) return;
      localStorage.setItem(localStorageKey, JSON.stringify(cart));
   }, [cart, cartLoaded, localStorageKey])

   return { cart, addToCart, updateCart, removeFromCart, clearCart };
}
