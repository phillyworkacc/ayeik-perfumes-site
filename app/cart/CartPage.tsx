'use client'
import { ArrowRight, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { pluralSuffixer } from "@/lib/str";
import { useEffect, useState } from "react";
import { FullCart } from "@/types";
import { loadCartInfo } from "../actions/products";
import { toast } from "sonner";
import { useModal } from "@/components/Modal/ModalContext";
import useCart from "@/hooks/useCart"
import EmptySection from "@/components/CustomSection/EmptySection"
import StoreWrapper from "@/components/StoreWrapper/StoreWrapper"
import Spacing from "@/components/Spacing/Spacing";
import QuantitySelector from "@/components/QuantitySelector/QuantitySelector";
import CheckoutButton from "@/components/CheckoutButton/CheckoutButton";
import useUser from "@/hooks/useUser";
import UpdateShippingAddress from "@/modals/UpdateShippingAddress";
import priceCalculator from "@/config/priceCalculatorV2";
import { formatNumber } from "@/utils/num";
import { useSession } from "next-auth/react";

export default function CartPage() {
   const { data: session } = useSession();
   const { user } = useUser();
   const { cart, updateCart, removeFromCart, clearCart } = useCart();
   const { showModal } = useModal();

   const router = useRouter();
   const [fullCart, setFullCart] = useState<FullCart | "loading">("loading");

   async function handleLoadCartInfo () {
      const fullCartInfo = await loadCartInfo(cart!);
      if (fullCartInfo) {
         setFullCart(fullCartInfo);
      } else {
         toast.error("Failed to get cart information")
      }
   }

   function handleUpdateAddress () {
      showModal({
         content: <UpdateShippingAddress />
      })
   }

   useEffect(() => {
      if (!cart) return;
      handleLoadCartInfo();
   }, [cart]);

   return (
      <StoreWrapper>
         <EmptySection bgColor="white" textColor="black">
            <div className="text-xb full bold-700">Cart</div>
            {(cart?.length! > 0) ? (<>
               {(fullCart == "loading") ? (<>
                  <div className="text-m full grey-5 pd-3">Loading Cart Items</div>
               </>) : (<>
                  <div className="text-sm full grey-5">
                     {fullCart.reduce((total, item) => (total + item.quantity), 0)} {pluralSuffixer("item",fullCart.reduce((total, item) => (total + item.quantity), 0),"s")}
                  </div>
                  <div className="box full dfb column gap-30">
                     {fullCart.map((cartItem, index) => (
                        <div key={index} className="box full dfb align-start gap-20 pd-1">
                           <div className="box h-full dfb align-center justify-center cart-image-wrap">
                              <img 
                                 src={`/products/${cartItem.product.images.split(",")[0]}`} alt="product-image"
                              />
                           </div>
                           <div className="box full h-full dfb column gap-10 mw-500">
                              <div className="text-m bold-600 full">{cartItem.product.name}</div>
                              <div className="text-xs grey-5 bold-500 full">£{cartItem.product.price.toFixed(2)}</div>
                              <QuantitySelector 
                                 quantity={cartItem.quantity} 
                                 onChange={(quantity) => updateCart({ productId: cartItem.product.productId, quantity })}
                                 maximum={10}
                              />
                              <button className="xxs delete pd-12 pdx-2" onClick={() => removeFromCart(cartItem.product.productId)}>
                                 <Trash2 size={17} /> Remove
                              </button>
                           </div>
                        </div>
                     ))}
                  </div>
               </>)}
               <button
                  className="xxs pd-13 pdx-2 tiny-shadow"
                  onClick={clearCart}
               ><Trash2 size={17} /> Clear Cart</button>
            </>) : (<>
               <div className="text-sm full grey-5">Your cart is empty.</div>
               <Spacing />
               <button
                  className="xs pd-13 pdx-3 tiny-shadow"
                  onClick={() => router.push("/")}
               >Shop Now <ArrowRight /></button>
            </>)}
            
            <Spacing size={2} />
            {fullCart !== "loading" && (
               <div className="box full dfb column gap-5">
                  <div className="text-xxs grey-5 full">Cart Total - {fullCart.reduce((total, item) => (total + item.quantity), 0)} item(s)</div>
                  <div className="text-xxl bold-600 full">
                     {formatNumber(
                        (priceCalculator(fullCart.map(ci => ({
                              productId: ci.product.productId, name: ci.product.name,
                              quantity: ci.quantity, price: Number(Math.round(ci.product.price * 100))
                           })
                        )).price / 100), {
                           prefix: "£",
                           useCommas: true,
                           showDecimals: true,
                           decimalPlaces: 2,
                        }
                     )}
                  </div>
               </div>
            )}

            {session?.user ? (<>
               <Spacing size={2} />
               <div className="box full pd-15 dfb column gap-10">
                  <div className="text-m bold-600 full">Shipping Address</div>
                  {([user?.addressLine1!, user?.addressCity!, user?.addressPostcode!].includes("")) ? (<>
                     <button className="xs pd-14 pdx-2" onClick={handleUpdateAddress}>Update Address to Continue</button>
                  </>) : (<>
                     <div className="text-s full">{user?.addressLine1}</div>
                     {(user?.addressLine2) && (<div className="text-s full">{user?.addressLine2}</div>)}
                     <div className="text-s full">{user?.addressCity}</div>
                     <div className="text-s full">{user?.addressPostcode}</div>
                     <div className="text-s visible-link underline accent-color" onClick={handleUpdateAddress}>Update Address</div>
                     <Spacing />
                     <div className="box full pd-2">
                        <CheckoutButton cart={cart!} />
                     </div>
                  </>)}
               </div>
            </>) : (<>
               <Spacing size={2} />
               <div className="box full pd-15 dfb column gap-10">
                  <div className="text-l bold-600 full">Sign In to Checkout</div>
                  <button className="xs pd-14 pdx-2 full mw-300 radius-15" onClick={() => router.push("/account/login")}>Sign In</button>
               </div>
            </>)}
         </EmptySection>
      </StoreWrapper>
   )
}
