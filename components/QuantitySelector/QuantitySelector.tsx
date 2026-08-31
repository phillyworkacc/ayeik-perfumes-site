'use client'
import "./QuantitySelector.css"
import { Minus, Plus } from "lucide-react";

type QuantitySelectorProps = {
   quantity: number;
   onChange: (newQuantity: number) => void;
   maximum: number;
}

export default function QuantitySelector ({ quantity, onChange, maximum }: QuantitySelectorProps) {
   function changeQuantity (change: number) {
      if (quantity == 1 && change < 0) return;
      if (quantity == maximum && change > 0) return;
      onChange(quantity + change);
   }

   return (
      <div className="quantity-selector">
         <div 
            className={`btn-decrease ${quantity == 1 ? 'disabled' : ''}`} 
            onClick={() => changeQuantity(-1)}
         ><Minus size={18} /></div>
         <div className="text-m full bold-600 text-center">{quantity}</div>
         <div 
            className={`btn-increase ${quantity == maximum ? 'disabled' : ''}`}
            onClick={() => changeQuantity(1)}
         ><Plus size={18} /></div>
      </div>
   )
}
