'use client'
import { Product } from "@/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import StoreWrapper from "@/components/StoreWrapper/StoreWrapper";
import ProductCard from "@/components/Product/ProductCard";
import EmptySection from "@/components/CustomSection/EmptySection";

type ProductsPageProps = {
   products: Product[];
}

export default function ProductsPage ({ products }: ProductsPageProps) {
   const [search, setSearch] = useState("");
   const router = useRouter();

   function applyFilters (products: Product[]) {
      return products.filter(product => (
         product.name.toLowerCase().includes(search.toLowerCase()) ||
         product.description.toLowerCase().includes(search.toLowerCase())
      )).sort((a,b) => a.name.localeCompare(b.name))
   }

   return (
      <StoreWrapper>
         <EmptySection bgColor="accent-color-30" textColor="black">
            <div className="box full">
               <div className="text-xb full bold-700">All Products</div>
            </div>
            <div className="box full pd-1 mw-600 mb-2">
               <input 
                  type="text" className="xs pd-13 pdx-2 full radius-20"
                  placeholder="Search Products"
                  value={search} onChange={e => setSearch(e.target.value)}
               />
            </div>
            <div className="box full pd-2 dfb wrap gap-30">
               {applyFilters(products).map(product => (
                  <ProductCard 
                     key={product.id} product={product} style="v2"
                     onClick={() => router.push(`/product/${product.productId}`)}
                  />
               ))}
            </div>
         </EmptySection>
      </StoreWrapper>
   )
}
