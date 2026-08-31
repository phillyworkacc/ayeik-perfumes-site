'use client'
import './Table.css'
import { useState } from 'react';
import { useModal } from '../Modal/ModalContext';
import { Order } from '@/types';
import { formatMilliseconds } from '@/utils/date';
import { formatNumber } from '@/utils/num';
import { titleCase } from '@/lib/str';
import Checkbox from '../Checkbox/Checkbox';
import OrderCardView from '@/modals/OrderCardView';

type OrdersTableProps = {
   title?: string;
   orders: Order[];
}

interface Filters extends Record<string, null | boolean> {
   awaitingShipment: null | boolean;
   awaitingShipmentPayment: null | boolean;
}

export default function OrdersTable ({ title, orders: rawOrders }: OrdersTableProps) {
   const { showMassiveModal } = useModal();
   const [orders, setOrders] = useState(rawOrders);
   const [orderViewCurrentIndex, setOrderViewCurrentIndex] = useState(-1);
   const [searchOrders, setSearchOrders] = useState('');
   const [filters, setFilters] = useState<Filters>({ awaitingShipment: null, awaitingShipmentPayment: null });

   const applyFilters = (orders: Order[]): Order[] => {
      return orders
         .filter(order => (
            order.email.toLowerCase().includes(searchOrders.toLowerCase()) ||
            order.addressLine1.toLowerCase().includes(searchOrders.toLowerCase()) ||
            order.addressLine2.toLowerCase().includes(searchOrders.toLowerCase()) ||
            order.addressCity.toLowerCase().includes(searchOrders.toLowerCase()) ||
            order.addressPostcode.toLowerCase().includes(searchOrders.toLowerCase())
         )) // search filter
         .filter(order => {
            if (!filters.awaitingShipment) return true;
            return (order.shippingStatus == "not_shipped")
         }) // filter for is awaiting shipment
         .filter(order => {
            if (!filters.awaitingShipmentPayment) return true;
            return (order.trackingNumber == null)
         }) // filter for is awaiting shipment
   }

   function openFilteredOrdersView (order: Order) {
      showMassiveModal({
         content: <OrderCardView 
            orders={applyFilters(orders)} 
            currentOrderIndex={applyFilters(orders).indexOf(order)}
            makeUpdate={updatedOrder => {
               setOrders(prev => ([
                  ...prev.map(order => {
                     if (order.orderId !== updatedOrder.orderId) return order;
                     return updatedOrder;
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
            <div className="text-s full grey-5 mb-05">{orders.length} order(s) found</div>
            <div className='box full dfb column'>
               <div className="box full pd-05">
                  <input
                     type="text"
                     className="xs full pd-13 pdx-15 tiny-shadow"
                     placeholder='Search orders...'
                     value={searchOrders}
                     onChange={e => setSearchOrders(e.target.value)}
                  />
               </div>
               <div className="box full dfb wrap align-center gap-15 pd-05 mb-15">
                  <Checkbox 
                     label='Awaiting Shipment'
                     onChange={t => setFilters(p => ({ ...p, awaitingShipment: t || null }))}
                  />
                  <Checkbox 
                     label='Awaiting Payment for Shipment'
                     onChange={t => setFilters(p => ({ ...p, hasShippingLabel: t || null }))}
                  />
               </div>
            </div>
            {(
               searchOrders !== '' ||
               Object.keys(filters).map((k) => filters[k]).includes(true)
            ) && (<div className="box full mb-05">
               <div className="text-xs full grey-4 mb-05">
                  After filters, {applyFilters(orders).length} orders(s) found
               </div>
            </div>)}
         </div>
         <div className="table-container">
            <table className="products-table">
               <thead>
                  <tr id='head-row'>
                     <th>Order Id</th>
                     <th style={{ width: "15%" }}>Customer</th>
                     <th>Order Total</th>
                     <th>Shipping Status</th>
                     <th>Tracking Number</th>
                     <th style={{ width: "20%" }}>Placed On</th>
                  </tr>
               </thead>
               <tbody>
                  {applyFilters(orders).map((order, index) => (
                     <tr key={index} onClick={() => openFilteredOrdersView(order)}>
                        <td className='name'>#{order.id}</td>
                        <td>{order.email.split("@")[0]}</td>
                        <td>{formatNumber(order.total/100, { prefix: "£", showDecimals: true, decimalPlaces: 2, useCommas: true })}</td>
                        <td>{order.shippingStatus}</td>
                        <td>{order.trackingNumber ?? "Awaiting Payment"}</td>
                        <td>{formatMilliseconds(parseInt(order.createdAt))}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </>
   )
}
