
/**
 * Deals available:
 *  deal1: any 3 non-LV fragrances           = £150 (15000p)
 *  deal2: any 3 Louis Vuitton fragrances     = £200 (20000p)
 *  deal3: 1 LV + 2 non-LV                    = £170 (17000p)
 *  deal4: 2 LV + 1 non-LV                    = £190 (19000p)
 *
 * Any items that don't fit into a 3-item deal are charged at their
 * original (normal) price.
 *
 * Strategy: this is solved with dynamic programming over
 * (numberOfLvItemsRemaining, numberOfNonLvItemsRemaining). For every
 * state we try every legal move (take 1 LV at full price, take 1
 * non-LV at full price, or apply deal1/2/3/4) and keep whichever
 * leads to the lowest total cost. Because every reachable state is
 * evaluated, this always finds the true cheapest combination of
 * deals for the whole cart - not just a greedy "biggest deal first"
 * approximation, which can miss cheaper mixes once carts get large
 * (12-30 items).
 */

import { CheckoutItem } from "@/types";

type Unit = { productId: string; name: string; price: number };

const DEAL1_PRICE = 15000; // 3 non-LV
const DEAL2_PRICE = 20000; // 3 LV
const DEAL3_PRICE = 17000; // 1 LV + 2 non-LV
const DEAL4_PRICE = 19000; // 2 LV + 1 non-LV

const LV_NAME_REGEX = /louis\s*vuitton/i;
const LV_FALLBACK_PRICE = 7500; // 75 GBP normal price, used if name doesn't mention LV

function isLouisVuitton(item: { name: string; price: number }): boolean {
   return LV_NAME_REGEX.test(item.name) || item.price === LV_FALLBACK_PRICE;
}

function flattenToUnits(items: CheckoutItem[]): Unit[] {
   const units: Unit[] = [];
   for (const item of items) {
      for (let i = 0; i < item.quantity; i++) {
         units.push({ productId: item.productId, name: item.name, price: item.price });
      }
   }
   return units;
}

/**
 * Splits `totalPrice` (pence) across `units` proportionally to each
 * unit's original price, using the largest-remainder method so the
 * resulting integers always sum to exactly `totalPrice`.
 */
function distributePrice(units: Unit[], totalPrice: number): number[] {
   const weights = units.map((u) => (u.price > 0 ? u.price : 1));
   const weightSum = weights.reduce((a, b) => a + b, 0);

   const raw = weights.map((w) => (totalPrice * w) / weightSum);
   const floors = raw.map(Math.floor);

   const remainder = totalPrice - floors.reduce((a, b) => a + b, 0);
   const order = raw
      .map((r, idx) => ({ idx, frac: r - Math.floor(r) }))
      .sort((a, b) => b.frac - a.frac);

   for (let i = 0; i < remainder; i++) {
      floors[order[i % order.length].idx] += 1;
   }

   return floors;
}

type DealChoice =
  | "leftoverLV"
  | "leftoverOther"
  | "deal1"
  | "deal2"
  | "deal3"
  | "deal4"
  | "";

export default function priceCalculator(checkoutItems: CheckoutItem[]) {
   const totalQuantity = checkoutItems.reduce((total, item) => total + item.quantity, 0);

   // deals need at least 3 items to ever apply
   if (totalQuantity < 3) {
      return {
         price: checkoutItems.reduce((total, item) => total + item.price * item.quantity, 0),
         newCheckOutItems: checkoutItems,
      };
   }

   const allUnits = flattenToUnits(checkoutItems);
   const lvUnits = allUnits.filter(isLouisVuitton);
   const nonLvUnits = allUnits.filter((u) => !isLouisVuitton(u));

   const L = lvUnits.length;
   const N = nonLvUnits.length;

   // dp[l][n] = cheapest total cost (pence) to price l LV units + n non-LV units
   const dp: number[][] = Array.from({ length: L + 1 }, () => new Array(N + 1).fill(0));
   const choice: DealChoice[][] = Array.from({ length: L + 1 }, () => new Array(N + 1).fill(""));

   for (let l = 0; l <= L; l++) {
      for (let n = 0; n <= N; n++) {
         if (l === 0 && n === 0) {
         dp[0][0] = 0;
         continue;
         }

         let best = Infinity;
         let bestChoice: DealChoice = "";

         // take one LV item at its own normal price
         if (l >= 1) {
         const cost = lvUnits[l - 1].price + dp[l - 1][n];
         if (cost < best) {
            best = cost;
            bestChoice = "leftoverLV";
         }
         }

         // take one non-LV item at its own normal price
         if (n >= 1) {
         const cost = nonLvUnits[n - 1].price + dp[l][n - 1];
         if (cost < best) {
            best = cost;
            bestChoice = "leftoverOther";
         }
         }

         // deal1: 3 non-LV
         if (n >= 3) {
         const cost = DEAL1_PRICE + dp[l][n - 3];
         if (cost < best) {
            best = cost;
            bestChoice = "deal1";
         }
         }

         // deal2: 3 LV
         if (l >= 3) {
         const cost = DEAL2_PRICE + dp[l - 3][n];
         if (cost < best) {
            best = cost;
            bestChoice = "deal2";
         }
         }

         // deal3: 1 LV + 2 non-LV
         if (l >= 1 && n >= 2) {
         const cost = DEAL3_PRICE + dp[l - 1][n - 2];
         if (cost < best) {
            best = cost;
            bestChoice = "deal3";
         }
         }

         // deal4: 2 LV + 1 non-LV
         if (l >= 2 && n >= 1) {
         const cost = DEAL4_PRICE + dp[l - 2][n - 1];
         if (cost < best) {
            best = cost;
            bestChoice = "deal4";
         }
         }

         dp[l][n] = best;
         choice[l][n] = bestChoice;
      }
   }

   // backtrack through the dp table to work out which deals/leftovers were used
   type PricedUnit = { productId: string; name: string; price: number };
   const pricedUnits: PricedUnit[] = [];

   let l = L;
   let n = N;

   while (l > 0 || n > 0) {
      const c = choice[l][n];

      switch (c) {
         case "leftoverLV": {
         const u = lvUnits[l - 1];
         pricedUnits.push({ productId: u.productId, name: u.name, price: u.price });
         l -= 1;
         break;
         }
         case "leftoverOther": {
         const u = nonLvUnits[n - 1];
         pricedUnits.push({ productId: u.productId, name: u.name, price: u.price });
         n -= 1;
         break;
         }
         case "deal1": {
         const bundle = nonLvUnits.slice(n - 3, n);
         const prices = distributePrice(bundle, DEAL1_PRICE);
         bundle.forEach((u, idx) =>
            pricedUnits.push({ productId: u.productId, name: u.name, price: prices[idx] })
         );
         n -= 3;
         break;
         }
         case "deal2": {
         const bundle = lvUnits.slice(l - 3, l);
         const prices = distributePrice(bundle, DEAL2_PRICE);
         bundle.forEach((u, idx) =>
            pricedUnits.push({ productId: u.productId, name: u.name, price: prices[idx] })
         );
         l -= 3;
         break;
         }
         case "deal3": {
         const bundle = [lvUnits[l - 1], ...nonLvUnits.slice(n - 2, n)];
         const prices = distributePrice(bundle, DEAL3_PRICE);
         bundle.forEach((u, idx) =>
            pricedUnits.push({ productId: u.productId, name: u.name, price: prices[idx] })
         );
         l -= 1;
         n -= 2;
         break;
         }
         case "deal4": {
         const bundle = [...lvUnits.slice(l - 2, l), nonLvUnits[n - 1]];
         const prices = distributePrice(bundle, DEAL4_PRICE);
         bundle.forEach((u, idx) =>
            pricedUnits.push({ productId: u.productId, name: u.name, price: prices[idx] })
         );
         l -= 2;
         n -= 1;
         break;
         }
         default:
         // should be unreachable - guards against an infinite loop if it ever is
         throw new Error(`Unexpected state during price backtrack: l=${l}, n=${n}`);
      }
   }

   // re-aggregate priced units back into checkout item lines
   const grouped = new Map<string, CheckoutItem>();
   for (const u of pricedUnits) {
      const key = `${u.productId}::${u.price}`;
      const existing = grouped.get(key);
      if (existing) {
         existing.quantity += 1;
      } else {
         grouped.set(key, { productId: u.productId, name: u.name, quantity: 1, price: u.price });
      }
   }

   const newCheckOutItems = Array.from(grouped.values());

   return {
      price: dp[L][N],
      newCheckOutItems,
   };
}