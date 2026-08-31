'use client'
import "./Product.css"
import { BadgeDollarSign, ShoppingCart, Truck } from "lucide-react";
import { Product } from '@/types';
import { useState } from "react";
import { toast } from "sonner";
import Spacing from "../Spacing/Spacing";
import QuantitySelector from "../QuantitySelector/QuantitySelector";
import useCart from "@/hooks/useCart";

type ProductProps = {
   product: Product;
}

export default function ProductFullPage ({ product }: ProductProps) {
   const { addToCart } = useCart();
   const [productImages, setProductImages] = useState(product.images.split(","));
   const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

   // purchasing states
   const [quantity, setQuantity] = useState(1);

   function handleAddToCart () {
      addToCart({ productId: product.productId, quantity });
      toast("Added!");
      navigator?.vibrate([100]);
   }

   return (
      <div className='product-full-page'>
         <div className="product-images">
            <div className="product-current-image">
               <img src={`/products/${productImages[currentImageIndex]}`} alt="product-highlighted-image" />
            </div>
            <div className="product-images-mini-list">
               {productImages.map((productImage, index) => (
                  <div key={index} className={`product-img-mini ${currentImageIndex == index ? 'selected':''}`}>
                     <img src={`/products/${productImage}`} alt="product-mini-image" />
                  </div>
               ))}
            </div>
         </div>
         <div className="product-details">
            <div className="box full pd-15 dfb column gap-10">
               <div className="text-xxxl full bold-800">{product.name}</div>
               <div className="text-m full grey-5 bold-600">£{product.price.toFixed(2)}</div>
               <div className="box full pd-1">
                  <QuantitySelector quantity={quantity} onChange={q => setQuantity(q)} maximum={10} />
               </div>
               <button className="xxs full pd-12" onClick={handleAddToCart}>
                  <ShoppingCart size={18} /> Add To Cart
               </button>
               <div className="box full dfb column gap-5 mt-2">
                  <div className="box full dfb align-center gap-5">
                     <Truck size={20} /> <div className="text-s fit">Reliable Shipping</div>
                  </div>
                  <div className="box full dfb align-center gap-5">
                     <BadgeDollarSign size={20} /> <div className="text-s fit">Discounts Available</div>
                  </div>
               </div>

               <Spacing size={2} />
               <div className="box full">
                  <div className="text-xxs bold-700 grey-5 full">DESCRIPTION</div>
                  <div className="text-s full pd-05">{product.description}</div>
               </div>
               
               <Spacing />
               <div className="box full">
                  <div className="text-xxs bold-700 grey-5 full">SHIPPING</div>
                  <div className="text-s full pd-05">
                     We strive to process and ship all orders in a timely manner, working diligently to ensure that your items are on their way to you as soon as possible.
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
