'use client'
import EmptySection from "@/components/CustomSection/EmptySection";
import ProductsTable from "@/components/Table/ProductsTable";
import AdminWrapper from "@/components/StoreWrapper/AdminWrapper";
import ImportProducts from "@/modals/ImportProducts";
import { Product } from "@/types";
import { useModal } from "@/components/Modal/ModalContext";
import { FileDown } from "lucide-react";

type AdminProductsPageProps = {
   products: Product[];
}

export default function AdminProductsPage ({ products }: AdminProductsPageProps) {
   const { showMassiveModal } = useModal();
   function openModalImportProducts () {
      showMassiveModal({
         content: <ImportProducts />
      })
   }
   return (
      <AdminWrapper>
         <EmptySection bgColor="white" textColor="black">
            <div className="box full">
               <div className="text-xb full bold-700">All Products</div>
            </div>
            <div className="box dfb wrap gap-10 full pd-1 mb-1">
               <button className="xxs pd-12 pdx-15 fit" onClick={openModalImportProducts}>
                  <FileDown size={17} /> Import Products
               </button>
            </div>
            <ProductsTable products={products} />
         </EmptySection>
      </AdminWrapper>
   )
}
