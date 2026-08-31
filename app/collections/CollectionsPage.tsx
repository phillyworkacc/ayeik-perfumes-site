'use client'
import { Collection } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import StoreWrapper from "@/components/StoreWrapper/StoreWrapper";
import EmptySection from "@/components/CustomSection/EmptySection";
import CollectionCard from "@/components/Card/CollectionCard";

type CollectionsPageProps = {
   collections: Collection[];
}

export default function CollectionsPage ({ collections }: CollectionsPageProps) {
   const [search, setSearch] = useState("");
   const router = useRouter();

   function applyFilters (collections: Collection[]) {
      return collections.filter(collection => (
         collection.name.toLowerCase().includes(search.toLowerCase())
      )).sort((a, b) => a.name.localeCompare(b.name))
   }

   return (
      <StoreWrapper>
         <EmptySection bgColor="accent-color-10" textColor="black">
            <div className="box full">
               <div className="text-xb full bold-700">All Collections</div>
            </div>
            <div className="box full pd-1 mw-600 mb-2">
               <input 
                  type="text" className="xs pd-13 pdx-2 full radius-20"
                  placeholder="Search Collections"
                  value={search} onChange={e => setSearch(e.target.value)}
               />
            </div>
            <div className="box full pd-2 dfb wrap gap-15">
               {collections.length > 0 ? (<>
                  {applyFilters(collections).map(collection => (
                     <CollectionCard key={collection.id} collection={collection} />
                  ))}
               </>) : (<>
                  <div className="text-m full grey-5">No Collections</div>
                  <button className="xxs pd-12 pdx-3" onClick={() => router.push("/products")}>See All Products</button>
               </>)}
            </div>
         </EmptySection>
      </StoreWrapper>
   )
}
