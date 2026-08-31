'use client'
import { Collection } from "@/types";
import { useState } from "react";
import { PackagePlus, Plus } from "lucide-react";
import { useModal } from "@/components/Modal/ModalContext";
import AddCollections from "@/modals/AddCollections";
import Spacing from "@/components/Spacing/Spacing";
import EmptySection from "@/components/CustomSection/EmptySection";
import CollectionsTable from "@/components/Table/CollectionsTable";
import AdminWrapper from "@/components/StoreWrapper/AdminWrapper";
import ProductsToCollections from "@/modals/ProductsToCollections";

type AdminCollectionsPageProps = {
   collections: Collection[];
}

export default function AdminCollectionsPage ({ collections }: AdminCollectionsPageProps) {
   const { showModal, showMassiveModal } = useModal();
   const [fullCollections, setFullCollections] = useState(collections);

   function handleAddCollection () {
      showModal({
         content: (<AddCollections onAdded={(newCollection) => setFullCollections(prev => ([ newCollection, ...prev ]))} />)
      })
   }

   function handleAddProductsToCollection () {
      showMassiveModal({
         content: (<ProductsToCollections collections={fullCollections} />)
      })
   }

   return (
      <AdminWrapper>
         <EmptySection bgColor="white" textColor="black">
            <div className="box full">
               <div className="text-xb full bold-700">All Collections</div>
            </div>
            <div className="box dfb wrap gap-10 full pd-1 mb-1">
               <button className="xxxs pd-12 pdx-15 fit" onClick={handleAddCollection}>
                  <Plus size={18} /> Add Collection
               </button>
               <button className="xxxs pd-12 pdx-15 fit" onClick={handleAddProductsToCollection}>
                  <PackagePlus size={18} /> Add Products to Collection
               </button>
            </div>
            <Spacing />
            <CollectionsTable collections={fullCollections} />
         </EmptySection>
      </AdminWrapper>
   )
}
