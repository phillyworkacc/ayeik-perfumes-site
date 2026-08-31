'use client'
import AwaitButton from "@/components/AwaitButton/AwaitButton";
import MultiSelectRow from "@/components/Select/MultiSelectRow";
import { addCollectionToProducts, getAllProductsExcludeColl } from "@/app/actions/products";
import { CustomImgIcon } from "@/components/Icons/Icon";
import { CustomSelect } from "@/components/Select/Select";
import { Collection, Product } from "@/types"
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useModal } from "@/components/Modal/ModalContext";

type ProductsToCollectionsProps = {
   collections: Collection[];
}

export default function ProductsToCollections ({ collections }: ProductsToCollectionsProps) {
   const { close } = useModal();
   const [collectionChosen, setCollectionChosen] = useState(collections[0].collectionId!);
   const collectionsOptions = collections.map(collection => ({
      option: collection.name!, optionName: collection.collectionId!
   }));
   const [productsToSelect, setProductsToSelect] = useState<Product[]>([]);
   const [productsChosen, setProductsChosen] = useState<string[]>([]);

   async function getAllProductsWithoutCollection (collectionId: string) {
      const products = await getAllProductsExcludeColl(collectionId);
      setProductsToSelect(products);
   }

   async function assignCollectionToProducts (callback: Function) {
      const updated = await addCollectionToProducts(productsChosen, collectionChosen);
      if (updated) {
         toast.success("Added Collection Successfully");
         close();
      } else {
         toast.error("Failed to add collections. Please try again later.");
      }
      callback();
   }

   useEffect(() => { getAllProductsWithoutCollection(collectionChosen) }, [collectionChosen])

   return (
      <div className="box full pd-1 pdx-05">
         <div className="box full dfb align-center">
            <div className="box full dfb column">
               <div className="text-ml bold-600 full">Add Product to a Collection</div>
               <div className="text-xxs grey-5 full">Easily add multiple products to a collection</div>
            </div>
            <AwaitButton className="xxxs fit whitespace-nowrap pd-11 pdx-15" onClick={assignCollectionToProducts}>
               <Check size={17} /> Done
            </AwaitButton>
         </div>
         <div className="box full pd-1 dfb column gap-5">
            <div className="text-s full bold-500">Choose a Collection</div>
            <CustomSelect
               options={collectionsOptions}
               onSelect={(option) => setCollectionChosen(option)}
               style={{ width: "100%", padding: "2px" }}
            />
         </div>
         <div className="box full pd-1 dfb column gap-5">
            <div className="text-s full bold-500">Choose Products</div>
            <MultiSelectRow
               items={productsToSelect}
               itemDisplay={product => (
                  <div className="box full dfb align-center gap-10">
                     <CustomImgIcon url={`/products/${product.images.split(",")[0]}`} size={30} />
                     <div className="text-xxs full">{product.name}</div>
                  </div>
               )}
               onSelect={(products) => setProductsChosen(products.map(product => product.productId))}
               searchKey="name"
               itemStyle={{ borderRadius: "10px", padding: "7px 10px" }}
            />
         </div>
      </div>
   )
}