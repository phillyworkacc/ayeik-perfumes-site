'use client'
import "./Product.css"
import { ShoppingCart } from "lucide-react";
import { Product } from "@/types"

type ProductCardProps = {
   product: Product;
   style: "v1" | "v2";
   onClick: () => void;
}

export default function ProductCard ({ product, style, onClick }: ProductCardProps) {   
   if (style == "v1") {
      return (
         <div className="product-card-style-1" onClick={onClick}>
            <div className="product-image">
               <img 
                  src={`/products/${product.images.split(',')[0]}`}
                  alt="product-main-image"
               />
            </div>
            <div className="box full pdx-1 pd-1 dfb align-center gap-10">
               <div className="box full">
                  <div className="text-xs full text-left bold-500">{product.name}</div>
                  <div className="text-xxs full text-left bold-800">£{product.price.toFixed(2)}</div>
               </div>
               <div className="box fit dfb align-center">
                  <button className="transparent no-shadow">
                     <ShoppingCart size={20} />
                  </button>
               </div>
            </div>
         </div>
      )
   } else if (style == "v2") {
      return (
         <div className="product-card-style-2" onClick={onClick}>
            <div className="product-image">
               <img 
                  src={`/products/${product.images.split(',')[0]}`}
                  alt="product-main-image"
               />
            </div>
            <div className="product-information">
               {(product.stock == 0) ? (<div className="product-sold-out">SOLD OUT</div>)
                  : (product.stock < 10) ? (<div className="product-low-stock">LOW STOCK</div>)
                  : (<></>)}
               <div className="product-info">
                  <div className="text-xs full text-left bold-500">{product.name}</div>
                  <div className="text-xxs full text-left bold-800">£{product.price.toFixed(2)}</div>
               </div>
            </div>
            <button className="transparent no-shadow product-add2cart">
               <ShoppingCart size={20} />
            </button>
         </div>
      )
   }
}
