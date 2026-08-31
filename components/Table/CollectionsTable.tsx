'use client'
import './Table.css'
import { useEffect, useState } from 'react';
import { useModal } from '../Modal/ModalContext';
import { Collection } from '@/types';
import { formatMilliseconds } from '@/utils/date';
import EditCollections from '@/modals/EditCollections';

type CollectionsTableProps = {
   title?: string;
   collections: Collection[];
}

export default function CollectionsTable ({ title, collections: rawCollections }: CollectionsTableProps) {
   const { showModal } = useModal();
   const [collections, setCollections] = useState(rawCollections);
   const [searchCollections, setSearchCollections] = useState('');

   useEffect(() => {
      setCollections(rawCollections)
   }, [rawCollections])

   const applyFilters = (collections: Collection[]): Collection[] => {
      return collections
         .filter(collection => collection.name.toLowerCase().includes(searchCollections.toLowerCase())) // search filter
         .sort((a, b) => a.name.localeCompare(b.name))
   }
   
      function openFilteredProductsView (collection: Collection) {
         showModal({
            content: <EditCollections 
               collection={collection} 
               onEdited={(updatedCollection) => {
                  setCollections(prev => ([
                     ...prev.map(collection => {
                        if (collection.collectionId !== updatedCollection.collectionId) return collection;
                        return updatedCollection;
                     })
                  ]))
               }}
            />
         })
      }

   return (
      <>
         <div className="box full mb-1 pdx-05">
            {(title) && (<div className="text-xs full bold-600 pdx-1 pd-1">{title}</div>)}
            <div className="text-s full grey-5 mb-05">{collections.length} collections found(s)</div>
            <div className='box full dfb column'>
               <div className="box full pd-05">
                  <input
                     type="text"
                     className="xs full pd-13 pdx-15 tiny-shadow"
                     placeholder='Search collections...'
                     value={searchCollections}
                     onChange={e => setSearchCollections(e.target.value)}
                  />
               </div>
            </div>
            {(searchCollections !== '') && (<div className="box full mb-05">
               <div className="text-xs full grey-4 mb-05">
                  After filters, {applyFilters(collections).length} collections(s) found
               </div>
            </div>)}
         </div>
         <div className="table-container">
            <table className="products-table">
               <thead>
                  <tr id='head-row'>
                     <th style={{ width: "30%" }}>Name</th>
                     <th>Description</th>
                     <th>Created</th>
                  </tr>
               </thead>
               <tbody>
                  {applyFilters(collections).map((collection, index) => (
                     <tr key={index} onClick={() => openFilteredProductsView(collection)}>
                        <td className='name'>
                           <div className="text-xxs bold-600 full" style={{ whiteSpace: "break-spaces" }}>{collection.name}</div>
                        </td>
                        <td>{collection.description}</td>
                        <td>{formatMilliseconds(parseInt(collection.createdAt), true)}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </>
   )
}
