'use client'
import AwaitButton from "@/components/AwaitButton/AwaitButton";
import Spacing from "@/components/Spacing/Spacing";
import { createCollection } from "@/app/actions/collections";
import { useModal } from "@/components/Modal/ModalContext";
import { Collection } from "@/types"
import { useState } from "react";
import { toast } from "sonner";

type AddCollectionsProps = {
   onAdded: (newCollection: Collection) => void;
}

export default function AddCollections ({ onAdded }: AddCollectionsProps) {
   const { close } = useModal();
   const [name, setName] = useState("");
   const [description, setDescription] = useState("");

   async function handleAddCollection (callback: Function) {
      if (name.trim() == "") {
         toast.error("Please enter a name for the collection");
         callback();
         return;
      }
      const newCollection = await createCollection({ name, description, createdAt: Date.now().toString() });
      if (newCollection) {
         toast.success("Created Collection");
         onAdded(newCollection);
         close();
      } else {
         toast.error("Failed to create collection. Try again later.");
      }
      callback();
   }

   return (
      <div className="box full pd-1 pdx-05">
         <div className="text-ml bold-600 full">Add Collection</div>
         <div className="text-xxs grey-5 full">Create a new collection for your products</div>
         <div className="box full pd-1">
            <div className="text-s full bold-600">Collection Name</div>
            <input 
               type="text" className="xxs pd-13 pdx-2 full mw-600"
               value={name} onChange={e => setName(e.target.value)}   
            />
         </div>
         <div className="box full pd-1">
            <div className="text-s full bold-600">Collection Description</div>
            <textarea 
               className="xxs pd-13 pdx-2 full h-20 mw-600 radius-15"
               value={description} onChange={e => setDescription(e.target.value)}
            />
         </div>
         <div className="box full pd-1 dfb wrap gap-10">
            <AwaitButton className="xxs pd-13 pdx-2 full whitespace-nowrap" onClick={handleAddCollection}>Create Collection</AwaitButton>
            <button className="xxs pd-13 pdx-2 full outline-black tiny-shadow whitespace-nowrap" onClick={close}>Close</button>
         </div>
         <Spacing />
      </div>
   )
}
