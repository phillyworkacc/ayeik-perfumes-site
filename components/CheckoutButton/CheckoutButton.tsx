"use client";
import { CartItem } from "@/types";
import { useState } from "react";
import { toast } from "sonner";

export default function CheckoutButton({ cart }: { cart: CartItem[] }) {
   const [loading, setLoading] = useState(false);

   async function handleCheckout () {
      try {
         setLoading(true);
         const response = await fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cart }),
         });

         const result = await response.json();
         if (result.error) toast.error(result.error);
         if (!response.ok) throw new Error(result.error ?? "Checkout failed");

         window.location.href = result.data
      } catch (error) {
         console.error(error);
         toast.error("Checkout Failed")
         setLoading(false);
      }
   }

   return (
      <button
         className="xs pd-14 full mw-500 radius-20"
         onClick={handleCheckout}
         disabled={loading || !cart.length}
      >
         {loading ? "Redirecting..." : "Checkout"}
      </button>
   );
}