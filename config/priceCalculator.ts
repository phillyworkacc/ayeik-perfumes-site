// this is custom to reselling customers who have deals on their products

import { CheckoutItem } from "@/types";

type QuantityDeals = "4" | "5" | "8" | "10" | "12"; 

export default function priceCalculator (checkoutItems: CheckoutItem[]) {
   // pricing deals begin from more than 4 items
   const totalQuantity = checkoutItems.reduce((total, item) => (total + item.quantity), 0);
   if (totalQuantity < 4) {
      return {
         price: checkoutItems.reduce((total, item) => (total + (item.price * item.quantity)), 0),
         newCheckOutItems: checkoutItems
      };
   }

   // enter pricing ranges into an array
   const quantityDeals = [4, 5, 8, 10, 12];

   // define pricing ranges
   const pricingRanges: Record<QuantityDeals, number> = {
      "4": 16000,
      "5": 19000,
      "8": 29900,
      "10": 35900,
      "12": 41900,
   }

   const productPricingRanges: Record<QuantityDeals, number> = {
      "4": 4000,
      "5": 3800,
      "8": 3437,
      "10": 3590,
      "12": 3491,
   }

   // find maximum discount price
   const maximumDiscountQuantity = `${quantityDeals.filter(qd => qd <= totalQuantity).toReversed()[0]}` as QuantityDeals;
   const maximumDiscount = pricingRanges[maximumDiscountQuantity];

   // 1. Find Offset Price: price of the other items that will be not be included in the deal
   // flatten all the items out
   const flattenedItems = [];
   for (const item of checkoutItems) {
      for (let i = 0; i < item.quantity; i++) {
         flattenedItems.push({ productId: item.productId, price: item.price })
      }
   }

   // price of the other items that will be not be included in the deal
   const offsetPrice = flattenedItems.filter((_, index) => (index >= parseInt(maximumDiscountQuantity))).reduce((total, item) => (total + item.price), 0);

   // make new checkout items
   const rawNewCheckOutItems = [
      ...flattenedItems.slice(0, parseInt(maximumDiscountQuantity)).map(fi => ({
         ...checkoutItems.find(ci => ci.productId == fi.productId)!,
         price: productPricingRanges[maximumDiscountQuantity], quantity: 1
      })),
      ...flattenedItems.filter((_, index) => (index >= parseInt(maximumDiscountQuantity))).map(fi => ({
         ...checkoutItems.find(ci => ci.productId == fi.productId)!, quantity: 1
      })),
   ]
   
   // fix it up
   const newCheckOutItems = rawNewCheckOutItems.reduce((newCi: any[], item) => {
      const copiedNewCi = [ ...newCi ];

      const existingProduct = copiedNewCi.find(ci => ci.productId == item.productId);
      const isAmongstDiscount = rawNewCheckOutItems.indexOf(item) < parseInt(maximumDiscountQuantity);

      if (existingProduct && isAmongstDiscount) {
         copiedNewCi[copiedNewCi.indexOf(existingProduct)].quantity += item.quantity;
         return copiedNewCi;
      }
      return [...copiedNewCi, item]; 
   }, [])

   console.log(newCheckOutItems);
   
   // total price
   // maximum discount price + offset price
   // in pennies for stripe
   return {
      price: maximumDiscount + offsetPrice,
      newCheckOutItems
   }
}