'use client'
import AwaitButton from "@/components/AwaitButton/AwaitButton";
import Spacing from "@/components/Spacing/Spacing";
import { editCollection } from "@/app/actions/collections";
import { useModal } from "@/components/Modal/ModalContext";
import { Collection } from "@/types"
import { useState } from "react";
import { toast } from "sonner";

type EditCollectionsProps = {
   collection: Collection;
   onEdited: (updatedCollection: Collection) => void;
}

export default function EditCollections ({ collection, onEdited }: EditCollectionsProps) {
   const { close } = useModal();
   const [name, setName] = useState(collection.name);
   const [description, setDescription] = useState(collection.description);

   async function handleEditCollection (callback: Function) {
      if (name.trim() == "") {
         toast.error("Please enter a name for the collection");
         callback();
         return;
      }
      const updatedCollection = { ...collection, name, description };
      const edited = await editCollection(updatedCollection);
      if (edited) {
         toast.success("Updated Collection");
         onEdited({ ...collection, name, description });
         close();
      } else {
         toast.error("Failed to edit collection. Try again later.");
      }
      callback();
   }

   return (
      <div className="box full pd-1 pdx-05">
         <div className="text-ml bold-600 full">Edit Collection</div>
         <div className="text-xxs grey-5 full">Edit your collection</div>
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
            <AwaitButton className="xxs pd-13 pdx-2 full" onClick={handleEditCollection}>Save Changes</AwaitButton>
            <button className="xxs pd-13 pdx-2 full outline-black tiny-shadow" onClick={close}>Close</button>
         </div>
         <Spacing />
      </div>
   )
}