"use client";
import AwaitButton from "@/components/AwaitButton/AwaitButton";
import ProductsTable from "@/components/Table/ProductsTable";
import Papa from "papaparse";
import { insertManyProducts } from "@/app/actions/products";
import { copyToClipboard, pluralSuffixer, titleCase } from "@/lib/str";
import { Product } from "@/types";
import { uuid } from "@/utils/uuid";
import { Copy, FileDown, X } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "sonner";

type ProductCSV = {
  name: string;
  description: string;
  images: string;
  stock: string;
  price: string;
  collections: string;
};

export default function ImportProducts() {
   const fileInputRef = useRef<HTMLInputElement>(null);
   const [products, setProducts] = useState<ProductCSV[]>([]);

   function handleCSVUpload(event: ChangeEvent<HTMLInputElement>) {
      const file = event.target.files?.[0];
      if (!file) return;

      Papa.parse<ProductCSV>(file, {
         header: true,
         skipEmptyLines: true,
         complete: (results) => {
            console.log(results.data);
            setProducts(results.data);
         },
         error: (error) => {
            console.error("CSV error:", error);
         },
      });
   }

   async function handleSaveProducts (callback: Function) {
      const newProducts: Omit<Product, "id">[] = products.map(product => ({
         productId: uuid(),
         name: titleCase(product.name),
         description: product.description,
         images: `${titleCase(product.name).toLowerCase().replaceAll(" ", "_")}.png`,
         stock: parseInt(product.stock),
         price: parseFloat(product.price),
         collections: [],
         createdAt: Date.now().toString()
      } as Omit<Product, "id">));
      const inserted = await insertManyProducts(newProducts);
      if (inserted) {
         toast.success(`${newProducts.length} ${pluralSuffixer("Product", newProducts.length, "s")} Inserted`);
      } else {
         toast.error("Failed to insert products");
      }
      callback();
   }

   return (
      <div className="box full dfb column gap-10">
         <div className="text-xl bold-700 full">Import Products</div>
         <div className="text-xxs grey-5 full">Select a csv file to import products</div>
      
         <div className="box full pd-1 pdx-05">
            {products.length > 0 ? (<>
               <div className="box full pd-1 dfb wrap gap-10">
                  <AwaitButton className="xxxs pd-12 pdx-2" onClick={handleSaveProducts}>
                     Save Products
                  </AwaitButton>
                  <button className="xxxs pd-12 pdx-2 outline-black" onClick={() => setProducts([])}>
                     <X size={15} /> Remove Products
                  </button>
                  <button className="xxxs pd-12 pdx-2 outline-black" onClick={() => copyToClipboard(JSON.stringify(products, null, 2))}>
                     <Copy size={15} /> Copy JSON
                  </button>
               </div>
            </>) : (<>
               <button className="xxxs pd-12 pdx-2" onClick={() => fileInputRef.current?.click()}>
                  <FileDown size={17} /> Import Products
               </button>
               <input
                  type="file" ref={fileInputRef}
                  id="products-import"
                  accept=".csv,text/csv"
                  style={{ display: "none" }}
                  onChange={handleCSVUpload}
               />
            </>)}
         </div>

         <div className="box full pd-1">
            {products.length == 0 && (<div className="text-xxs full">No Products Imported</div>)}
            {products.length > 0 && (<>
               <ProductsTable
                  products={(products.map(product => ({
                     ...product,
                     price: parseFloat(product.price),
                     name: titleCase(product.name)
                  })) as any) as Product[]}
               />
            </>)}
         </div>
         {/* <pre>{JSON.stringify(products, null, 2)}</pre> */}
      </div>
   );
}