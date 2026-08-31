'use client'
import './Table.css'
import { CustomImgIcon } from '../Icons/Icon';
import { useState } from 'react';
import { useModal } from '../Modal/ModalContext';
import { Product } from '@/types';
import Checkbox from '../Checkbox/Checkbox';
import ProductCardView from '@/modals/ProductCardView';

type ProductsTableProps = {
   title?: string;
   products: Product[];
}

interface Filters extends Record<string, null | boolean> {
   isSoldOut: null | boolean;
}

export default function ProductsTable ({ title, products: rawProducts }: ProductsTableProps) {
   const { showMassiveModal } = useModal();
   const [products, setProducts] = useState(rawProducts);
   const [productViewCurrentIndex, setProductViewCurrentIndex] = useState(-1);
   const [searchProducts, setSearchProducts] = useState('');
   const [filters, setFilters] = useState<Filters>({ isSoldOut: null });

   const applyFilters = (products: Product[]): Product[] => {
      return products
         .filter(product => product.name.toLowerCase().includes(searchProducts.toLowerCase())) // search filter
         .filter(product => {
            if (!filters.isSoldOut) return true;
            return (product.stock < 1)
         }) // filter for is sold out
         .sort((a, b) => a.name.localeCompare(b.name))
   }

   function openFilteredProductsView (product: Product) {
      showMassiveModal({
         content: <ProductCardView 
            products={applyFilters(products)} 
            currentProductIndex={applyFilters(products).indexOf(product)}
            makeUpdate={(updatedProduct) => {
               setProducts(prev => ([
                  ...prev.map(product => {
                     if (product.productId !== updatedProduct.productId) return product;
                     return updatedProduct;
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
            <div className="text-s full grey-5 mb-05">{products.length} product(s) found</div>
            <div className='box full dfb column'>
               <div className="box full pd-05">
                  <input
                     type="text"
                     className="xs full pd-13 pdx-15 tiny-shadow"
                     placeholder='Search products...'
                     value={searchProducts}
                     onChange={e => setSearchProducts(e.target.value)}
                  />
               </div>
               <div className="box full dfb wrap align-center gap-15 pd-05 mb-15">
                  <Checkbox 
                     label='Sold Out'
                     onChange={t => setFilters(p => ({ ...p, isSoldOut: t || null }))}
                  />
               </div>
            </div>
            {(
               searchProducts !== '' ||
               Object.keys(filters).map((k) => filters[k]).includes(true)
            ) && (<div className="box full mb-05">
               <div className="text-xs full grey-4 mb-05">
                  After filters, {applyFilters(products).length} products(s) found
               </div>
            </div>)}
         </div>
         <div className="table-container">
            <table className="products-table">
               <thead>
                  <tr id='head-row'>
                     <th style={{ width: "30%" }}>Name</th>
                     <th>Description</th>
                     <th>Price</th>
                     <th>Stock</th>
                  </tr>
               </thead>
               <tbody>
                  {applyFilters(products).map((product, index) => (
                     <tr key={index} onClick={() => openFilteredProductsView(product)}>
                        <td className='name'>
                           <div className="box full dfb align-center gap-10">
                              <div className="box fit dfb align-center justify-center">
                                 <CustomImgIcon url={`/products/${product.images.split(",")[0]}`} size={50} />
                              </div>
                              <div className="box full dfb column">
                                 <div className="text-xxs bold-600 full" style={{ whiteSpace: "break-spaces" }}>{product.name}</div>
                              </div>
                           </div>
                        </td>
                        <td>{product.description}</td>
                        <td><b>£{product.price.toFixed(2)}</b></td>
                        <td>{product.stock}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </>
   )
}
