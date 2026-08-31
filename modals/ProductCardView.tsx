"use client"
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Collection, Product } from "@/types";
import { CustomImgIcon } from "@/components/Icons/Icon";
import { editProduct } from "@/app/actions/products";
import { getAllCollections } from "@/app/actions/collections";
import { CustomSelect } from "@/components/Select/Select";
import Spacing from "@/components/Spacing/Spacing";
import AwaitButton from "@/components/AwaitButton/AwaitButton";

type ProductCardViewProps = {
   products: Product[];
   currentProductIndex: number;
   makeUpdate: (product: Product) => void;
}

function ProductCollections ({ product }: { product: Product }) {
   const [allCollections, setAllCollections] = useState<Collection[]>([]);
   const [collectionChosen, setCollectionChosen] = useState("");
   const [collectionOptions, setCollectionOptions] = useState<{option:any,optionName:any}[]>([]);
   const [editingProduct, setEditingProduct] = useState(product);

   async function loadCollections() {
      const collections = await getAllCollections();
      setAllCollections(collections);
      setCollectionOptions(collections.map(collection => ({
         option: collection.name!, optionName: collection.collectionId!
      })));
   }
   useEffect(() => { loadCollections() }, [product])

   function allProductCollections () {
      return allCollections.filter(collection => editingProduct.collections.includes(collection.collectionId!));
   }

   function handleAddCollection () {
      if (!collectionChosen) {
         toast.error("Please choose a collection to add");
         return;
      }
      if (editingProduct.collections.includes(collectionChosen)) {
         toast.error("Product has that collection");
         return;
      }
      setEditingProduct(p => ({ ...p, collections: [ ...p.collections, collectionChosen ] }));
   }

   function handleRemoveCollection (collectionId: string) {
      setEditingProduct(prev => ({
         ...prev,
         collections: [ ...prev.collections.filter(cId => collectionId !== cId) ]
      }))
   }

   async function handleSaveProduct (callback: Function) {
      const saved = await editProduct(editingProduct);
      if (saved) {
         toast.success("Saved Product");
      } else {
         toast.error("Failed to save product. Try again later.");
      }
      callback();
   }

   return (
      <div className="box full dfb column gap-5">
         <div className="text-ml bold-600 full">Collections</div>
         {(allCollections.length == 0) ? (<>
            <div className="text-xs full grey-5">No collections exist</div>
         </>) : (<>
            <div className="text-xs full grey-5">Add and remove collections</div>
            {allProductCollections().length == 0 && (
               <div className="text-xxs full grey-5">This product has no collections</div>
            )}
            {allProductCollections().map(collection => (
               <div 
                  key={collection.collectionId} 
                  className="box full radius-20 pd-15 pdx-15 dfb align-center gap-5 mw-400"
                  style={{ border: "1px solid #ededed" }}
               >
                  <div className="text-xxs full bold-500">{collection.name}</div>
                  <button className="xxs fit delete pdx-1" onClick={() => handleRemoveCollection(collection.collectionId!)}>
                     <Trash2 size={17} />
                  </button>
               </div>
            ))}
            {collectionOptions.length > 0 && (<>            
               <div className="box full mw-400 mt-15">
                  <div className="text-sm full bold-600 pd-05">Add Collections</div>
                  <div className="box full dfb align-center gap-5">
                     <CustomSelect
                        options={collectionOptions}
                        onSelect={(option) => setCollectionChosen(option)}
                        style={{ width: "100%", padding: "5px" }}
                        defaultOptionIndex={0}
                     />
                     <div className="box fit pd-1 dfb column gap-5">
                        <button className="xxs pd-13 pdx-2 fit" onClick={handleAddCollection}><Plus size={17} /></button>
                     </div>
                  </div>
               </div>
            </>)}
         </>)}
         <div className="box full pd-1 dfb column gap-5">
            <AwaitButton className="xxs pd-13 pdx-2 fit" onClick={handleSaveProduct}>Save Collections</AwaitButton>
         </div>
      </div>
   )
}

export default function ProductCardView ({ products, currentProductIndex }: ProductCardViewProps) {
   const [allProducts, setAllProducts] = useState<Product[]>(products);
   const [viewingIndex, setViewingIndex] = useState<number>(currentProductIndex);
   const [editingProduct, setEditingProduct] = useState({ ...products[currentProductIndex] });

   useEffect(() => {
      setEditingProduct(allProducts[viewingIndex]);
   }, [viewingIndex])

   function gotoPreviousProduct () {
      if (viewingIndex === 0) return;
      setViewingIndex(i => i-1);
   }
   
   function gotoNextProduct () {
      if (viewingIndex === (allProducts.length-1)) return;
      setViewingIndex(i => i+1);
   }

   async function handleSaveProduct (callback: Function) {
      const saved = await editProduct(editingProduct);
      if (saved) {
         toast.success("Saved Product");
      } else {
         toast.error("Failed to save product. Try again later.");
      }
      callback();
   }

   return (
      <div className="box full dfb column gap-10">
         <div className="box full dfb align-center gap-10 pd-1">
            <button 
               className="xs grey no-shadow pd-1 pdx-1" 
               onClick={gotoPreviousProduct}
               disabled={(viewingIndex === 0)}
            ><ChevronLeft size={16} /></button>
            <button 
               className="xs grey no-shadow pd-1 pdx-1" 
               onClick={gotoNextProduct}
               disabled={(viewingIndex === (allProducts.length-1))}
            ><ChevronRight size={16} /></button>
         </div>
         <div className="box full pd-1">
            <CustomImgIcon url={`/products/${allProducts[viewingIndex].images.split(",")[0]}`} size={90}  />
         </div>
         <div className="box full pd-1 dfb column gap-5">
            <div className="text-s full bold-600">Product Name</div>
            <input 
               type="text" className="xxs pd-13 pdx-2 full mw-600"
               value={editingProduct.name} onChange={e => setEditingProduct(p => ({ ...p, name: e.target.value }))}   
            />
         </div>
         <div className="box full pd-1 dfb column gap-5">
            <div className="text-s full bold-600">Product Description</div>
            <textarea 
               className="xxs pd-13 pdx-2 full h-30 mw-600 radius-15"
               value={editingProduct.description} onChange={e => setEditingProduct(p => ({ ...p, description: e.target.value }))}   
            />
         </div>
         <div className="box full pd-1 dfb column gap-5">
            <div className="text-s full bold-600">Price (£)</div>
            <input 
               type="text" className="xxs pd-13 pdx-2 full mw-600"
               value={editingProduct.price} onChange={e => setEditingProduct(p => ({ ...p, price: e.target.value == "" ? 0 : parseFloat(e.target.value) }))}   
            />
         </div>
         <div className="box full pd-1 dfb column gap-5">
            <div className="text-s full bold-600">Stock Available</div>
            <input 
               type="text" className="xxs pd-13 pdx-2 full mw-600"
               value={editingProduct.stock} onChange={e => setEditingProduct(p => ({ ...p, stock: e.target.value == "" ? 0 : parseInt(e.target.value) }))}   
            />
         </div>
         <div className="box full pd-1 dfb column gap-5">
            <AwaitButton className="xxs pd-13 pdx-2 fit" onClick={handleSaveProduct}>Save Product</AwaitButton>
         </div>
         <Spacing size={2} />
         <ProductCollections product={editingProduct} />
         <Spacing size={10} />
      </div>
   )
}
